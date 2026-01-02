import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { contextQueryOptions, useContext } from "@/api";
import { contextConfigs, isValidContextCategory } from "@/config/sections";
import type { ContextCategory } from "@/types/context";
import { ContextDialog } from "@/components/context-dialog";

export const Route = createFileRoute("/context/$category")({
	beforeLoad: ({ params }) => {
		if (!isValidContextCategory(params.category)) {
			throw redirect({ to: "/context" });
		}
	},
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			contextQueryOptions(params.category as ContextCategory),
		),
	component: ContextDetail,
});

function ContextDetail() {
	const { category } = Route.useParams();
	const { data: contextItem } = useContext(category as ContextCategory);
	const config = contextConfigs[category as ContextCategory];
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="space-y-6">
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-2xl font-semibold">{config.title}</h1>
						<p className="text-sm text-muted-foreground mt-1">
							{config.description}
						</p>
					</div>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground"
						onClick={() => setEditDialogOpen(true)}
					>
						<Pencil className="h-4 w-4" />
					</Button>
				</div>

				{contextItem?.body ? (
					<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
						<ReactMarkdown>{contextItem.body}</ReactMarkdown>
					</div>
				) : (
					<div className="text-muted-foreground text-sm py-8 text-center">
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
