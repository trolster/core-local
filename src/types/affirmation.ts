import { z } from "zod";

export const AffirmationSchema = z.object({
	id: z.coerce.string(),
	content: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Affirmation = z.infer<typeof AffirmationSchema>;
