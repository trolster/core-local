import { createFileRoute, redirect } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { contextsQueryOptions, useContexts } from "@/api";
import { ContextDialog } from "@/components/context-dialog";
import { Button } from "@/components/ui/button";
import { contextConfigs, isValidContextCategory } from "@/config/sections";
import type { ContextCategory } from "@/types/context";

export const Route = createFileRoute("/context/$category")({
	beforeLoad: ({ params }) => {
		if (!isValidContextCategory(params.category)) {
			throw redirect({ to: "/context" });
		}
	},
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(contextsQueryOptions()),
	component: ContextDetail,
});

function ContextDetail() {
	const { category } = Route.useParams();
	const { getByCategory } = useContexts();
	const contextItem = getByCategory(category as ContextCategory);
	const config = contextConfigs[category as ContextCategory];
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-6">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-overline">{config.description}</p>
						<h1 className="text-title mt-1">{config.title}</h1>
					</div>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-primary hover:bg-primary/10"
						onClick={() => setEditDialogOpen(true)}
					>
						<Pencil className="h-4 w-4" />
					</Button>
				</div>

				<div className="h-px bg-border" />

				{contextItem?.body ? (
					<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
						<ReactMarkdown>{contextItem.body}</ReactMarkdown>
					</div>
				) : (
					<div className="text-muted-foreground text-sm py-12 text-center rounded-lg border border-dashed border-border">
						No content yet. Click the edit button to add content.
					</div>
				)}
			</div>

			<ContextDialog
				category={category as ContextCategory}
				context={contextItem ?? undefined}
				open={editDialogOpen}
				onOpenChange={setEditDialogOpen}
			/>
		</div>
	);
}
