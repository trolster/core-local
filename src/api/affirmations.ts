import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AffirmationSchema, type Affirmation } from "@/types/affirmation";
import { api } from "./client";

// Query options for all affirmations
export function affirmationsQueryOptions() {
	return {
		queryKey: ["affirmations"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/affirmations");
			return z.array(AffirmationSchema).parse(data);
		},
	};
}

// Get date-seeded daily affirmation
function getDailyAffirmation(affirmations: Affirmation[]): Affirmation | null {
	if (affirmations.length === 0) return null;
	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const seed = today.split("-").reduce((a, b) => a + Number.parseInt(b), 0);
	const index = seed % affirmations.length;
	return affirmations[index];
}

// Hook for all affirmation operations
export function useAffirmations() {
	const queryClient = useQueryClient();
	const affirmationsQuery = useQuery(affirmationsQueryOptions());

	const invalidateAffirmations = () => {
		queryClient.invalidateQueries({ queryKey: ["affirmations"] });
	};

	const createAffirmation = useMutation({
		mutationFn: async (content: string) => {
			const now = new Date().toISOString();
			const data = await api.post<unknown>("/affirmations", {
				content,
				createdAt: now,
				updatedAt: now,
			});
			return AffirmationSchema.parse(data);
		},
		onSuccess: invalidateAffirmations,
	});

	const updateAffirmation = useMutation({
		mutationFn: async ({ id, content }: { id: string; content: string }) => {
			const data = await api.patch<unknown>(`/affirmations/${id}`, {
				content,
				updatedAt: new Date().toISOString(),
			});
			return AffirmationSchema.parse(data);
		},
		onSuccess: invalidateAffirmations,
	});

	const deleteAffirmation = useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/affirmations/${id}`);
		},
		onSuccess: invalidateAffirmations,
	});

	const dailyAffirmation = affirmationsQuery.data
		? getDailyAffirmation(affirmationsQuery.data)
		: null;

	return {
		affirmations: affirmationsQuery.data ?? [],
		dailyAffirmation,
		isLoading: affirmationsQuery.isLoading,
		createAffirmation,
		updateAffirmation,
		deleteAffirmation,
	};
}
