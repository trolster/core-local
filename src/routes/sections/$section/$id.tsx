import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sectionItemQueryOptions, useSectionItem } from "@/api";
import { CopyButton } from "@/components/copy-button";
import { DeleteDialog } from "@/components/delete-dialog";
import { SectionDialog } from "@/components/section-dialog";
import { Button } from "@/components/ui/button";
import { sectionConfigs } from "@/config/sections";

export const Route = createFileRoute("/sections/$section/$id")({
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			sectionItemQueryOptions(params.section, params.id),
		),
	component: SectionDetail,
});

function SectionDetail() {
	const { section, id } = Route.useParams();
	// useSectionItem subscribes to cache updates (loader data is static after initial load)
	const { data: item } = useSectionItem(section, id);
	const config = sectionConfigs[section];
	const metadata = item ? config?.getMetadata?.(item) : null;
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	if (!item) return null;

	return (
		<div className="p-8 max-w-4xl mx-auto space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
						{item.code}
					</span>
					<h1 className="text-title mt-2">{item.title}</h1>
					{metadata && (
						<p className="text-sm text-muted-foreground mt-1 capitalize">
							{metadata}
						</p>
					)}
				</div>
				<div className="flex items-center gap-1">
					<CopyButton
						text={`[${item.code}] ${item.title}\n\n${item.body}`}
						variant="header"
					/>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-primary hover:bg-primary/10"
						onClick={() => setEditDialogOpen(true)}
					>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
						onClick={() => setDeleteDialogOpen(true)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="h-px bg-border" />

			<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
				<ReactMarkdown>{item.body}</ReactMarkdown>
			</div>

			<SectionDialog
				section={section}
				mode="edit"
				item={item}
				open={editDialogOpen}
				onOpenChange={setEditDialogOpen}
			/>
			<DeleteDialog
				section={section}
				item={item}
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
			/>
		</div>
	);
}
