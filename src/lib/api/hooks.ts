import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
	type SectionItemBase,
	type SectionName,
	sectionSchemas,
} from "../../types/section";
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
