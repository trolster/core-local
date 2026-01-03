import { createFileRoute } from "@tanstack/react-router";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { affirmationsQueryOptions, useAffirmations } from "@/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Affirmation } from "@/types/affirmation";

export const Route = createFileRoute("/affirmations")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(affirmationsQueryOptions()),
	component: AffirmationsPage,
});

function AffirmationRow({
	affirmation,
	onUpdate,
	onDelete,
}: {
	affirmation: Affirmation;
	onUpdate: (content: string) => void;
	onDelete: () => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(affirmation.content);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.select();
		}
	}, [isEditing]);

	const handleSave = () => {
		if (editContent.trim() && editContent !== affirmation.content) {
			onUpdate(editContent.trim());
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditContent(affirmation.content);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSave();
		} else if (e.key === "Escape") {
			handleCancel();
		}
	};

	if (isEditing) {
		return (
			<div className="rounded-lg border border-border bg-card p-4 space-y-3">
				<Textarea
					ref={textareaRef}
					value={editContent}
					onChange={(e) => setEditContent(e.target.value)}
					onKeyDown={handleKeyDown}
					className="min-h-[80px] text-sm resize-none"
					placeholder="Enter your affirmation..."
				/>
				<div className="flex justify-end gap-2">
					<Button size="sm" variant="ghost" onClick={handleCancel}>
						<X className="h-4 w-4 mr-1" />
						Cancel
					</Button>
					<Button size="sm" onClick={handleSave}>
						<Check className="h-4 w-4 mr-1" />
						Save
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-border bg-card p-4 group hover:border-border/80 transition-colors">
			<div className="flex items-start gap-3">
				<p className="flex-1 text-sm leading-relaxed">{affirmation.content}</p>
				<div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity shrink-0">
					<Button
						size="sm"
						variant="ghost"
						className="h-7 w-7 p-0 text-muted-foreground"
						onClick={() => setIsEditing(true)}
					>
						<Pencil className="h-3.5 w-3.5" />
					</Button>
					<Button
						size="sm"
						variant="ghost"
						className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
						onClick={onDelete}
					>
						<Trash2 className="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function AffirmationsPage() {
	const [newContent, setNewContent] = useState("");
	const [isAdding, setIsAdding] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const {
		affirmations,
		createAffirmation,
		updateAffirmation,
		deleteAffirmation,
	} = useAffirmations();

	useEffect(() => {
		if (isAdding && textareaRef.current) {
			textareaRef.current.focus();
		}
	}, [isAdding]);

	const handleAdd = () => {
		if (newContent.trim()) {
			createAffirmation.mutate(newContent.trim(), {
				onSuccess: () => {
					setNewContent("");
					setIsAdding(false);
				},
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleAdd();
		} else if (e.key === "Escape") {
			setNewContent("");
			setIsAdding(false);
		}
	};

	return (
		<div className="h-[calc(100vh-40px)] overflow-y-auto">
			<div className="max-w-2xl mx-auto p-8 space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold">Affirmations</h1>
						<p className="text-sm text-muted-foreground mt-1">
							Statements to reaffirm your values and intentions
						</p>
					</div>
					{!isAdding && (
						<Button size="sm" onClick={() => setIsAdding(true)}>
							<Plus className="h-4 w-4 mr-1.5" />
							Add
						</Button>
					)}
				</div>

				{isAdding && (
					<div className="rounded-lg border border-primary/30 bg-card p-4 space-y-3">
						<Textarea
							ref={textareaRef}
							value={newContent}
							onChange={(e) => setNewContent(e.target.value)}
							onKeyDown={handleKeyDown}
							className="min-h-[80px] text-sm resize-none"
							placeholder="Write your affirmation..."
						/>
						<div className="flex justify-end gap-2">
							<Button
								size="sm"
								variant="ghost"
								onClick={() => {
									setNewContent("");
									setIsAdding(false);
								}}
							>
								Cancel
							</Button>
							<Button
								size="sm"
								onClick={handleAdd}
								disabled={!newContent.trim() || createAffirmation.isPending}
							>
								{createAffirmation.isPending ? "Adding..." : "Add"}
							</Button>
						</div>
					</div>
				)}

				{affirmations.length === 0 && !isAdding ? (
					<div className="flex flex-col items-center py-16 text-muted-foreground rounded-xl border border-dashed border-border">
						<p className="text-sm">No affirmations yet</p>
						<Button
							variant="outline"
							size="sm"
							className="mt-4 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
							onClick={() => setIsAdding(true)}
						>
							<Plus className="h-3.5 w-3.5 mr-1.5" />
							Add your first affirmation
						</Button>
					</div>
				) : (
					<div className="space-y-3">
						{affirmations.map((affirmation) => (
							<AffirmationRow
								key={affirmation.id}
								affirmation={affirmation}
								onUpdate={(content) =>
									updateAffirmation.mutate({ id: affirmation.id, content })
								}
								onDelete={() => deleteAffirmation.mutate(affirmation.id)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
