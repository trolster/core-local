import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useContexts } from "@/api";
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
	const { updateContext } = useContexts();
	const [body, setBody] = useState(context?.body ?? "");

	// Reset form when dialog opens with new context
	useEffect(() => {
		if (open) {
			setBody(context?.body ?? "");
		}
	}, [open, context?.body]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		updateContext.mutate(
			{ id: context?.id, category, body },
			{ onSuccess: () => onOpenChange(false) },
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-4xl max-h-[85vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Edit {config.title}</DialogTitle>
				</DialogHeader>
				<form
					id="context-form"
					onSubmit={handleSubmit}
					className="flex-1 overflow-hidden"
				>
					<div className="grid grid-cols-2 gap-4 h-[400px]">
						{/* Editor pane */}
						<div className="flex flex-col space-y-2 min-h-0">
							<span className="text-overline shrink-0">Editor</span>
							<Textarea
								value={body}
								onChange={(e) => setBody(e.target.value)}
								placeholder="Write your content in Markdown..."
								className="flex-1 min-h-0 resize-none font-mono text-sm overflow-y-auto"
							/>
						</div>
						{/* Preview pane */}
						<div className="flex flex-col space-y-2 min-h-0">
							<span className="text-overline shrink-0">Preview</span>
							<div className="flex-1 min-h-0 overflow-y-auto rounded-lg border-2 border-border bg-muted/30 p-4">
								{body ? (
									<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
										<ReactMarkdown>{body}</ReactMarkdown>
									</div>
								) : (
									<p className="text-sm text-muted-foreground italic">
										Preview will appear here...
									</p>
								)}
							</div>
						</div>
					</div>
				</form>
				{updateContext.isError && (
					<p className="text-sm text-destructive">
						Failed to save. Please try again.
					</p>
				)}
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={updateContext.isPending}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="context-form"
						disabled={updateContext.isPending}
					>
						{updateContext.isPending ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
