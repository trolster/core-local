import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
	type Challenge,
	ChallengeSchema,
	type Constraint,
	ConstraintSchema,
	type Driver,
	DriverSchema,
	type Goal,
	GoalSchema,
	type Mission,
	MissionSchema,
	type Narrative,
	NarrativeSchema,
	type Problem,
	ProblemSchema,
	type Project,
	ProjectSchema,
} from "../../types/core";
import { api } from "./client";

// Drivers
export function useDrivers() {
	return useQuery({
		queryKey: ["drivers"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/drivers");
			return z.array(DriverSchema).parse(data);
		},
	});
}

export function useDriver(id: string) {
	return useQuery({
		queryKey: ["drivers", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/drivers/${id}`);
			return DriverSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateDriver() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			driver: Omit<Driver, "id" | "createdAt" | "updatedAt">,
		) => {
			const newDriver = {
				...driver,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/drivers", newDriver);
			return DriverSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["drivers"] });
		},
	});
}

export function useUpdateDriver() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...driver }: Partial<Driver> & { id: string }) => {
			const data = await api.patch<unknown>(`/drivers/${id}`, {
				...driver,
				updatedAt: new Date().toISOString(),
			});
			return DriverSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["drivers"] });
			queryClient.invalidateQueries({ queryKey: ["drivers", data.id] });
		},
	});
}

export function useDeleteDriver() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/drivers/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["drivers"] });
		},
	});
}

// Problems
export function useProblems() {
	return useQuery({
		queryKey: ["problems"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/problems");
			return z.array(ProblemSchema).parse(data);
		},
	});
}

export function useProblem(id: string) {
	return useQuery({
		queryKey: ["problems", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/problems/${id}`);
			return ProblemSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateProblem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			problem: Omit<Problem, "id" | "createdAt" | "updatedAt">,
		) => {
			const newProblem = {
				...problem,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/problems", newProblem);
			return ProblemSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["problems"] });
		},
	});
}

export function useUpdateProblem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...problem
		}: Partial<Problem> & { id: string }) => {
			const data = await api.patch<unknown>(`/problems/${id}`, {
				...problem,
				updatedAt: new Date().toISOString(),
			});
			return ProblemSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["problems"] });
			queryClient.invalidateQueries({ queryKey: ["problems", data.id] });
		},
	});
}

export function useDeleteProblem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/problems/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["problems"] });
		},
	});
}

// Missions
export function useMissions() {
	return useQuery({
		queryKey: ["missions"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/missions");
			return z.array(MissionSchema).parse(data);
		},
	});
}

export function useMission(id: string) {
	return useQuery({
		queryKey: ["missions", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/missions/${id}`);
			return MissionSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateMission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			mission: Omit<Mission, "id" | "createdAt" | "updatedAt">,
		) => {
			const newMission = {
				...mission,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/missions", newMission);
			return MissionSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["missions"] });
		},
	});
}

export function useUpdateMission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...mission
		}: Partial<Mission> & { id: string }) => {
			const data = await api.patch<unknown>(`/missions/${id}`, {
				...mission,
				updatedAt: new Date().toISOString(),
			});
			return MissionSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["missions"] });
			queryClient.invalidateQueries({ queryKey: ["missions", data.id] });
		},
	});
}

export function useDeleteMission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/missions/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["missions"] });
		},
	});
}

// Goals
export function useGoals() {
	return useQuery({
		queryKey: ["goals"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/goals");
			return z.array(GoalSchema).parse(data);
		},
	});
}

export function useGoal(id: string) {
	return useQuery({
		queryKey: ["goals", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/goals/${id}`);
			return GoalSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateGoal() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
			const newGoal = {
				...goal,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/goals", newGoal);
			return GoalSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
		},
	});
}

export function useUpdateGoal() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...goal }: Partial<Goal> & { id: string }) => {
			const data = await api.patch<unknown>(`/goals/${id}`, {
				...goal,
				updatedAt: new Date().toISOString(),
			});
			return GoalSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
			queryClient.invalidateQueries({ queryKey: ["goals", data.id] });
		},
	});
}

export function useDeleteGoal() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/goals/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
		},
	});
}

// Challenges
export function useChallenges() {
	return useQuery({
		queryKey: ["challenges"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/challenges");
			return z.array(ChallengeSchema).parse(data);
		},
	});
}

export function useChallenge(id: string) {
	return useQuery({
		queryKey: ["challenges", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/challenges/${id}`);
			return ChallengeSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateChallenge() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			challenge: Omit<Challenge, "id" | "createdAt" | "updatedAt">,
		) => {
			const newChallenge = {
				...challenge,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/challenges", newChallenge);
			return ChallengeSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
		},
	});
}

export function useUpdateChallenge() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...challenge
		}: Partial<Challenge> & { id: string }) => {
			const data = await api.patch<unknown>(`/challenges/${id}`, {
				...challenge,
				updatedAt: new Date().toISOString(),
			});
			return ChallengeSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
			queryClient.invalidateQueries({ queryKey: ["challenges", data.id] });
		},
	});
}

export function useDeleteChallenge() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/challenges/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
		},
	});
}

// Constraints
export function useConstraints() {
	return useQuery({
		queryKey: ["constraints"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/constraints");
			return z.array(ConstraintSchema).parse(data);
		},
	});
}

export function useConstraint(id: string) {
	return useQuery({
		queryKey: ["constraints", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/constraints/${id}`);
			return ConstraintSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateConstraint() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			constraint: Omit<Constraint, "id" | "createdAt" | "updatedAt">,
		) => {
			const newConstraint = {
				...constraint,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/constraints", newConstraint);
			return ConstraintSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["constraints"] });
		},
	});
}

export function useUpdateConstraint() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...constraint
		}: Partial<Constraint> & { id: string }) => {
			const data = await api.patch<unknown>(`/constraints/${id}`, {
				...constraint,
				updatedAt: new Date().toISOString(),
			});
			return ConstraintSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["constraints"] });
			queryClient.invalidateQueries({ queryKey: ["constraints", data.id] });
		},
	});
}

export function useDeleteConstraint() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/constraints/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["constraints"] });
		},
	});
}

// Projects
export function useProjects() {
	return useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/projects");
			return z.array(ProjectSchema).parse(data);
		},
	});
}

export function useProject(id: string) {
	return useQuery({
		queryKey: ["projects", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/projects/${id}`);
			return ProjectSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			project: Omit<Project, "id" | "createdAt" | "updatedAt">,
		) => {
			const newProject = {
				...project,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/projects", newProject);
			return ProjectSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...project
		}: Partial<Project> & { id: string }) => {
			const data = await api.patch<unknown>(`/projects/${id}`, {
				...project,
				updatedAt: new Date().toISOString(),
			});
			return ProjectSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["projects", data.id] });
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/projects/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}

// Narratives
export function useNarratives() {
	return useQuery({
		queryKey: ["narratives"],
		queryFn: async () => {
			const data = await api.get<unknown[]>("/narratives");
			return z.array(NarrativeSchema).parse(data);
		},
	});
}

export function useNarrative(id: string) {
	return useQuery({
		queryKey: ["narratives", id],
		queryFn: async () => {
			const data = await api.get<unknown>(`/narratives/${id}`);
			return NarrativeSchema.parse(data);
		},
		enabled: !!id,
	});
}

export function useCreateNarrative() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			narrative: Omit<Narrative, "id" | "createdAt" | "updatedAt">,
		) => {
			const newNarrative = {
				...narrative,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const data = await api.post<unknown>("/narratives", newNarrative);
			return NarrativeSchema.parse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["narratives"] });
		},
	});
}

export function useUpdateNarrative() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			...narrative
		}: Partial<Narrative> & { id: string }) => {
			const data = await api.patch<unknown>(`/narratives/${id}`, {
				...narrative,
				updatedAt: new Date().toISOString(),
			});
			return NarrativeSchema.parse(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["narratives"] });
			queryClient.invalidateQueries({ queryKey: ["narratives", data.id] });
		},
	});
}

export function useDeleteNarrative() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/narratives/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["narratives"] });
		},
	});
}
