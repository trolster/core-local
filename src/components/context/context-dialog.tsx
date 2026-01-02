import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateContext } from "@/api";
import { contextConfigs } from "@/config/sections";
import type { Context, ContextCategory } from "@/types/context";

interface ContextDialogProps {
	category: ContextCategory;
	context?: Context;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ContextDialog({
	category,
	context,
	open,
	onOpenChange,
}: ContextDialogProps) {
	const config = contextConfigs[category];
	const updateMutation = useUpdateContext();
	const [body, setBody] = useState(context?.body ?? "");

	// Reset form when dialog opens with new context
	useEffect(() => {
		if (open) {
			setBody(context?.body ?? "");
		}
	}, [open, context?.body]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		updateMutation.mutate(
			{
				id: context?.id,
				category,
				body,
			},
			{
				onSuccess: () => {
					onOpenChange(false);
				},
			},
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Edit {config.title}</DialogTitle>
				</DialogHeader>
				<form
					id="context-form"
					onSubmit={handleSubmit}
					className="flex-1 overflow-hidden flex flex-col"
				>
					<Textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="Write your content in Markdown..."
						className="flex-1 min-h-[300px] resize-none font-mono text-sm"
					/>
				</form>
				{updateMutation.isError && (
					<p className="text-sm text-destructive">
						Failed to save. Please try again.
					</p>
				)}
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={updateMutation.isPending}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="context-form"
						disabled={updateMutation.isPending}
					>
						{updateMutation.isPending ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
