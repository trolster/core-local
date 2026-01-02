import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { type ContextCategory, ContextSchema } from "@/types/context";
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

// Query options for all contexts (used for route loader)
export function contextsQueryOptions() {
	return {
		queryKey: ["contexts"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/contexts");
			return z.array(ContextSchema).parse(data);
		},
	};
}

// Single hook for all context operations
export function useContexts() {
	const queryClient = useQueryClient();
	const contextsQuery = useQuery(contextsQueryOptions());

	const getByCategory = (category: ContextCategory) =>
		contextsQuery.data?.find((c) => c.category === category) ?? null;

	const updateContext = useMutation({
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
				const data = await api.patch<unknown>(`/contexts/${id}`, {
					body,
					updatedAt: now,
				});
				return ContextSchema.parse(data);
			}
			const data = await api.post<unknown>("/contexts", {
				category,
				body,
				createdAt: now,
				updatedAt: now,
			});
			return ContextSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["contexts"] });
		},
	});

	return {
		contexts: contextsQuery.data ?? [],
		getByCategory,
		updateContext,
	};
}

// ============================================
// Log hooks (daily journal entries)
// ============================================

// Query options for all logs with items
export function logsQueryOptions() {
	return {
		queryKey: ["logs"],
		queryFn: async (): Promise<LogWithItems[]> => {
			const [logsData, itemsData] = await Promise.all([
				api.get<unknown[]>("/logs"),
				api.get<unknown[]>("/logItems"),
			]);

			const logs = z.array(LogSchema).parse(logsData);
			const items = z.array(LogItemSchema).parse(itemsData);

			return logs
				.map((log) => ({
					...log,
					items: items.filter((item) => item.logId === log.id),
				}))
				.sort((a, b) => b.date.localeCompare(a.date));
		},
	};
}

// Single hook for all log operations
export function useLogs() {
	const queryClient = useQueryClient();
	const logsQuery = useQuery(logsQueryOptions());

	const invalidateLogs = () => {
		queryClient.invalidateQueries({ queryKey: ["logs"] });
	};

	const createLog = useMutation({
		mutationFn: async (date: string) => {
			const now = new Date().toISOString();
			const data = await api.post<unknown>("/logs", {
				date,
				createdAt: now,
				updatedAt: now,
			});
			return LogSchema.parse(data);
		},
		onSuccess: invalidateLogs,
	});

	const deleteLog = useMutation({
		mutationFn: async (logId: string) => {
			const itemsData = await api.get<unknown[]>(`/logItems?logId=${logId}`);
			const items = z.array(LogItemSchema).parse(itemsData);

			for (const item of items) {
				await api.delete(`/logItems/${item.id}`);
			}

			await api.delete(`/logs/${logId}`);
		},
		onSuccess: invalidateLogs,
	});

	const createLogItem = useMutation({
		mutationFn: async ({ logId, content }: { logId: string; content: string }) => {
			const now = new Date().toISOString();
			const data = await api.post<unknown>("/logItems", {
				logId,
				content,
				createdAt: now,
				updatedAt: now,
			});
			return LogItemSchema.parse(data);
		},
		onSuccess: invalidateLogs,
	});

	const updateLogItem = useMutation({
		mutationFn: async ({ id, content }: { id: string; content: string }) => {
			const data = await api.patch<unknown>(`/logItems/${id}`, {
				content,
				updatedAt: new Date().toISOString(),
			});
			return LogItemSchema.parse(data);
		},
		onSuccess: invalidateLogs,
	});

	const deleteLogItem = useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/logItems/${id}`);
		},
		onSuccess: invalidateLogs,
	});

	return {
		logs: logsQuery.data ?? [],
		createLog,
		deleteLog,
		createLogItem,
		updateLogItem,
		deleteLogItem,
	};
}
