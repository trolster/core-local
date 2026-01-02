import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { LogItemRow } from "@/components/log-item-row";
import type { LogWithItems } from "@/types/log";

interface LogEntryProps {
	log: LogWithItems;
	displayDate: string;
	onAddItem: (content: string) => void;
	onUpdateItem: (id: string, content: string) => void;
	onDeleteItem: (id: string) => void;
	onDeleteLog: () => void;
	isDeleting: boolean;
}

export function LogEntry({
	log,
	displayDate,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	onDeleteLog,
	isDeleting,
}: LogEntryProps) {
	const [newItemContent, setNewItemContent] = useState("");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleAddItem = () => {
		if (newItemContent.trim()) {
			onAddItem(newItemContent.trim());
			setNewItemContent("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleAddItem();
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">{displayDate}</h2>
				<Button
					size="sm"
					variant="ghost"
					className="h-7 px-2 text-muted-foreground hover:text-destructive"
					onClick={() => setDeleteDialogOpen(true)}
				>
					<Trash2 className="h-3.5 w-3.5" />
				</Button>
			</div>

			<div className="space-y-1">
				{log.items.map((item) => (
					<LogItemRow
						key={item.id}
						item={item}
						onUpdate={(content) => onUpdateItem(item.id, content)}
						onDelete={() => onDeleteItem(item.id)}
					/>
				))}
			</div>

			<div className="flex items-center gap-2">
				<Input
					value={newItemContent}
					onChange={(e) => setNewItemContent(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Add a new entry..."
					className="text-sm"
				/>
				<Button
					size="sm"
					variant="ghost"
					onClick={handleAddItem}
					disabled={!newItemContent.trim()}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this log?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete the log for {displayDate} and all its
							entries. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								onDeleteLog();
								setDeleteDialogOpen(false);
							}}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
