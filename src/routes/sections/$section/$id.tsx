import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { DeleteDialog } from "@/components/sections/delete-dialog";
import { SectionDialog } from "@/components/sections/section-dialog";
import { Button } from "@/components/ui/button";
import { sectionItemQueryOptions, useSectionItem } from "@/api";
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
		<div className="p-6 max-w-2xl space-y-4">
			<div className="flex items-start justify-between">
				<div>
					<span className="text-xs font-mono text-muted-foreground">
						{item.code}
					</span>
					<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
					{metadata && (
						<p className="text-xs text-muted-foreground mt-1 capitalize">
							{metadata}
						</p>
					)}
				</div>
				<div className="flex items-center gap-1">
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground"
						onClick={() => setEditDialogOpen(true)}
					>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive"
						onClick={() => setDeleteDialogOpen(true)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
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
