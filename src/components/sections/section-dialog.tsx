import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateSectionItem, useUpdateSectionItem } from "@/lib/api";
import { sectionConfigs } from "@/lib/sections";
import type { SectionItemBase } from "@/types/section";
import { type SectionFormData, SectionForm } from "./section-form";

interface SectionDialogProps {
	section: string;
	mode: "create" | "edit";
	item?: SectionItemBase;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SectionDialog({
	section,
	mode,
	item,
	open,
	onOpenChange,
}: SectionDialogProps) {
	const navigate = useNavigate();
	const createMutation = useCreateSectionItem(section);
	const updateMutation = useUpdateSectionItem(section);
	const config = sectionConfigs[section];
	const formId = "section-form";

	const isLoading = createMutation.isPending || updateMutation.isPending;
	const isError = createMutation.isError || updateMutation.isError;

	function handleSubmit(data: SectionFormData) {
		if (mode === "create") {
			createMutation.mutate(data, {
				onSuccess: (newItem) => {
					onOpenChange(false);
					navigate({
						to: "/sections/$section/$id",
						params: { section, id: newItem.id },
					});
				},
			});
		} else if (item) {
			updateMutation.mutate(
				{ id: item.id, ...data },
				{
					onSuccess: () => {
						onOpenChange(false);
					},
				},
			);
		}
	}

	const title =
		mode === "create" ? `New ${config?.singular}` : `Edit ${config?.singular}`;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<SectionForm
					id={formId}
					section={section}
					defaultValues={item}
					onSubmit={handleSubmit}
				/>
				{isError && (
					<p className="text-sm text-destructive">
						Failed to save. Please try again.
					</p>
				)}
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" form={formId} disabled={isLoading}>
						{isLoading ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
