import { useNavigate } from "@tanstack/react-router";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteSectionItem } from "@/lib/api";
import { sectionConfigs } from "@/lib/sections";
import type { SectionItemBase } from "@/types/section";

interface DeleteDialogProps {
	section: string;
	item: SectionItemBase;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({
	section,
	item,
	open,
	onOpenChange,
}: DeleteDialogProps) {
	const navigate = useNavigate();
	const deleteMutation = useDeleteSectionItem(section);
	const config = sectionConfigs[section];
	const singular = config?.singular.toLowerCase() || "item";

	function handleDelete() {
		deleteMutation.mutate(item.id, {
			onSuccess: () => {
				onOpenChange(false);
				navigate({ to: "/sections/$section", params: { section } });
			},
		});
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {item.title}?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this{" "}
						{singular}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				{deleteMutation.isError && (
					<p className="text-sm text-destructive">
						Failed to delete. Please try again.
					</p>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={deleteMutation.isPending}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={deleteMutation.isPending}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{deleteMutation.isPending ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
