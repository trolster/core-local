import { z } from "zod";

export const ContextCategorySchema = z.enum([
	"history",
	"current_status",
	"interests",
	"wisdom",
	"media",
]);
export type ContextCategory = z.infer<typeof ContextCategorySchema>;

export const ContextSchema = z.object({
	id: z.string(),
	category: ContextCategorySchema,
	body: z.string(), // Markdown content
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Context = z.infer<typeof ContextSchema>;
