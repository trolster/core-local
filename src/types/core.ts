import { z } from "zod";

const CoreItemBaseSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	code: z.string(),
});

export const DriverSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	subtitle: z.string().optional(),
	description: z.string(),
	details: z.array(z.string()).optional(),
});

export type Driver = z.infer<typeof DriverSchema>;

export const ProblemSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	description: z.string(),
});

export type Problem = z.infer<typeof ProblemSchema>;

export const MissionSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	description: z.string(),
});

export type Mission = z.infer<typeof MissionSchema>;

export const GoalSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	missionCode: z.string(),
	statement: z.string(),
	horizon: z.string(),
	finishLine: z.array(z.string()),
	legitimacy: z.string(),
});

export type Goal = z.infer<typeof GoalSchema>;

export const ChallengeSchema = CoreItemBaseSchema.extend({
	tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
	title: z.string(),
	description: z.string(),
});

export type Challenge = z.infer<typeof ChallengeSchema>;

export const ConstraintSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	addresses: z.array(z.string()),
	description: z.string(),
	mechanism: z.string(),
	failureModes: z.array(z.string()),
	costStructureAlignment: z.array(z.string()),
	signals: z.array(z.string()),
});

export type Constraint = z.infer<typeof ConstraintSchema>;

export const ProjectSchema = CoreItemBaseSchema.extend({
	title: z.string(),
	status: z.enum(["ongoing", "next", "done"]),
	description: z.string().optional(),
	goalCodes: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const NarrativeSchema = CoreItemBaseSchema.extend({
	type: z.enum(["primary", "extended"]),
	title: z.string(),
	description: z.string(),
	audience: z.string().optional(),
});

export type Narrative = z.infer<typeof NarrativeSchema>;
