import { z } from "zod";

export const SectionItemBaseSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	code: z.string(),
	title: z.string(),
	body: z.string(), // Markdown content
});
export type SectionItemBase = z.infer<typeof SectionItemBaseSchema>;

export const DriverSchema = SectionItemBaseSchema;
export type Driver = z.infer<typeof DriverSchema>;

export const ProblemSchema = SectionItemBaseSchema;
export type Problem = z.infer<typeof ProblemSchema>;

export const MissionSchema = SectionItemBaseSchema;
export type Mission = z.infer<typeof MissionSchema>;

export const GoalSchema = SectionItemBaseSchema.extend({
	missionCode: z.string(),
	horizon: z.string(),
});
export type Goal = z.infer<typeof GoalSchema>;

export const ChallengeSchema = SectionItemBaseSchema.extend({
	tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});
export type Challenge = z.infer<typeof ChallengeSchema>;

export const ConstraintSchema = SectionItemBaseSchema.extend({
	addresses: z.array(z.string()),
});
export type Constraint = z.infer<typeof ConstraintSchema>;

export const ProjectSchema = SectionItemBaseSchema.extend({
	status: z.enum(["ongoing", "next", "done"]),
	goalCodes: z.array(z.string()).optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const NarrativeSchema = SectionItemBaseSchema.extend({
	type: z.enum(["primary", "extended"]),
	audience: z.string().optional(),
});
export type Narrative = z.infer<typeof NarrativeSchema>;

// Section name to schema mapping
export const sectionSchemas = {
	drivers: DriverSchema,
	problems: ProblemSchema,
	missions: MissionSchema,
	goals: GoalSchema,
	challenges: ChallengeSchema,
	constraints: ConstraintSchema,
	projects: ProjectSchema,
	narratives: NarrativeSchema,
} as const;

export type SectionName = keyof typeof sectionSchemas;
