import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
	type Context,
	type ContextCategory,
	ContextSchema,
} from "@/types/context";
import {
	LogItemSchema,
	LogSchema,
	type LogWithItems,
} from "@/types/log";
import {
	type SectionItemBase,
	type SectionName,
	sectionSchemas,
} from "@/types/section";
import { api } from "./client";

// Query options factory for section data
export function sectionQueryOptions(section: string) {
	const schema = sectionSchemas[section as SectionName];
	return {
		queryKey: [section],
		queryFn: async () => {
			const data = await api.get<unknown[]>(`/${section}`);
			return z.array(schema).parse(data);
		},
		enabled: !!section && !!schema,
	};
}

// Fetch all items for a section
export function useSection(section: string) {
	return useQuery(sectionQueryOptions(section));
}

// Query options factory for single section item
export function sectionItemQueryOptions(section: string, id: string) {
	const schema = sectionSchemas[section as SectionName];
	return {
		queryKey: [section, id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/${section}/${id}`);
			return schema.parse(data);
		},
		enabled: !!id && !!schema,
	};
}

// Fetch a single item by section and id
export function useSectionItem(section: string, id: string) {
	return useQuery(sectionItemQueryOptions(section, id));
}

// Create a new item in a section
export function useCreateSectionItem(section: string) {
	const queryClient = useQueryClient();
	const schema = sectionSchemas[section as SectionName];

	return useMutation({
		mutationFn: async (item: Omit<SectionItemBase, "id" | "createdAt" | "updatedAt"> & Record<string, unknown>) => {
			const newItem = {
				...item,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>(`/${section}`, newItem);
			return schema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [section] });
		},
	});
}

// Update an existing item in a section
export function useUpdateSectionItem(section: string) {
	const queryClient = useQueryClient();
	const schema = sectionSchemas[section as SectionName];

	return useMutation({
		mutationFn: async ({ id, ...updates }: { id: string } & Record<string, unknown>) => {
			const data = await api.patch<unknown>(`/${section}/${id}`, {
				...updates,
				updatedAt: new Date().toISOString(),
			});
			return schema.parse(data) as SectionItemBase;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [section] });
			queryClient.invalidateQueries({ queryKey: [section, data.id] });
		},
	});
}

// Delete an item from a section
export function useDeleteSectionItem(section: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/${section}/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [section] });
		},
	});
}

// ============================================
// Context hooks (one document per category)
// ============================================

// Query options factory for all contexts
export function contextsQueryOptions() {
	return {
		queryKey: ["contexts"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/contexts");
			return z.array(ContextSchema).parse(data);
		},
	};
}

// Fetch all contexts
export function useContexts() {
	return useQuery(contextsQueryOptions());
}

// Query options factory for a single context by category
export function contextQueryOptions(category: ContextCategory) {
	return {
		queryKey: ["contexts", category],
		queryFn: async () => {
			const data = await api.get<unknown[]>(`/contexts?category=${category}`);
			const contexts = z.array(ContextSchema).parse(data);
			return contexts[0] ?? null;
		},
		enabled: !!category,
	};
}

// Fetch a single context by category
export function useContext(category: ContextCategory) {
	return useQuery(contextQueryOptions(category));
}

// Update a context (updates existing or creates if none exists for category)
export function useUpdateContext() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			category,
			body,
		}: {
			id?: string;
			category: ContextCategory;
			body: string;
		}) => {
			const now = new Date().toISOString();

			if (id) {
				// Update existing
				const data = await api.patch<unknown>(`/contexts/${id}`, {
					body,
					updatedAt: now,
				});
				return ContextSchema.parse(data);
			}
			// Create new
			const data = await api.post<unknown>("/contexts", {
				category,
				body,
				createdAt: now,
				updatedAt: now,
			});
			return ContextSchema.parse(data);
		},
		onSuccess: (data: Context) => {
			queryClient.invalidateQueries({ queryKey: ["contexts"] });
			queryClient.invalidateQueries({ queryKey: ["contexts", data.category] });
		},
	});
}

// ============================================
// Log hooks (daily journal entries)
// ============================================

// Query options for all logs (just the log records, not items)
export function logsQueryOptions() {
	return {
		queryKey: ["logs"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/logs");
			return z.array(LogSchema).parse(data);
		},
	};
}

// Fetch all logs
export function useLogs() {
	return useQuery(logsQueryOptions());
}

// Query options for logs with their items for specific dates
export function logsWithItemsQueryOptions(dates: string[]) {
	return {
		queryKey: ["logs", "withItems", dates],
		queryFn: async (): Promise<LogWithItems[]> => {
			if (dates.length === 0) return [];

			// Fetch logs for the specified dates
			const logsData = await api.get<unknown[]>(
				`/logs?${dates.map((d) => `date=${d}`).join("&")}`,
			);
			const logs = z.array(LogSchema).parse(logsData);

			if (logs.length === 0) return [];

			// Fetch items for these logs
			const logIds = logs.map((l) => l.id);
			const itemsData = await api.get<unknown[]>(
				`/logItems?${logIds.map((id) => `logId=${id}`).join("&")}`,
			);
			const items = z.array(LogItemSchema).parse(itemsData);

			// Combine logs with their items
			return logs
				.map((log) => ({
					...log,
					items: items.filter((item) => item.logId === log.id),
				}))
				.sort((a, b) => b.date.localeCompare(a.date)); // Descending by date
		},
		enabled: dates.length > 0,
	};
}

// Fetch logs with items for specific dates
export function useLogsWithItems(dates: string[]) {
	return useQuery(logsWithItemsQueryOptions(dates));
}

// Create a new log for a date
export function useCreateLog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (date: string) => {
			const now = new Date().toISOString();
			const data = await api.post<unknown>("/logs", {
				date,
				createdAt: now,
				updatedAt: now,
			});
			return LogSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["logs"] });
		},
	});
}

// Delete a log and all its items
export function useDeleteLog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (logId: string) => {
			// First delete all items for this log
			const itemsData = await api.get<unknown[]>(`/logItems?logId=${logId}`);
			const items = z.array(LogItemSchema).parse(itemsData);

			for (const item of items) {
				await api.delete(`/logItems/${item.id}`);
			}

			// Then delete the log
			await api.delete(`/logs/${logId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["logs"] });
		},
	});
}

// Create a new log item
export function useCreateLogItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			logId,
			content,
		}: {
			logId: string;
			content: string;
		}) => {
			const now = new Date().toISOString();
			const data = await api.post<unknown>("/logItems", {
				logId,
				content,
				createdAt: now,
				updatedAt: now,
			});
			return LogItemSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["logs"] });
		},
	});
}

// Update a log item
export function useUpdateLogItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, content }: { id: string; content: string }) => {
			const data = await api.patch<unknown>(`/logItems/${id}`, {
				content,
				updatedAt: new Date().toISOString(),
			});
			return LogItemSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["logs"] });
		},
	});
}

// Delete a log item
export function useDeleteLogItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/logItems/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["logs"] });
		},
	});
}
