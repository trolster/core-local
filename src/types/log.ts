import { z } from "zod";

export const LogSchema = z.object({
	id: z.string(),
	date: z.string(), // YYYY-MM-DD format
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Log = z.infer<typeof LogSchema>;

export const LogItemSchema = z.object({
	id: z.string(),
	logId: z.string(),
	content: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type LogItem = z.infer<typeof LogItemSchema>;

// Combined log with its items for display
export type LogWithItems = Log & {
	items: LogItem[];
};
