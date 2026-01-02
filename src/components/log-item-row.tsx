import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LogItem } from "@/types/log";

interface LogItemRowProps {
	item: LogItem;
	onUpdate: (content: string) => void;
	onDelete: () => void;
}

export function LogItemRow({ item, onUpdate, onDelete }: LogItemRowProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(item.content);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleSave = () => {
		if (editContent.trim() && editContent !== item.content) {
			onUpdate(editContent.trim());
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditContent(item.content);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSave();
		} else if (e.key === "Escape") {
			handleCancel();
		}
	};

	if (isEditing) {
		return (
			<div className="flex items-center gap-2 group py-1">
				<span className="text-muted-foreground select-none">•</span>
				<Input
					ref={inputRef}
					value={editContent}
					onChange={(e) => setEditContent(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={handleSave}
					className="flex-1 h-7 text-sm"
				/>
				<Button
					size="sm"
					variant="ghost"
					className="h-6 w-6 p-0"
					onClick={handleSave}
				>
					<Check className="h-3.5 w-3.5 text-green-600" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="h-6 w-6 p-0"
					onClick={handleCancel}
				>
					<X className="h-3.5 w-3.5 text-muted-foreground" />
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-start gap-2 group py-1 hover:bg-foreground/5 rounded px-1 -mx-1">
			<span className="text-muted-foreground select-none mt-0.5">•</span>
			<span className="flex-1 text-sm">{item.content}</span>
			<div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
				<Button
					size="sm"
					variant="ghost"
					className="h-6 w-6 p-0 text-muted-foreground"
					onClick={() => setIsEditing(true)}
				>
					<Pencil className="h-3 w-3" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
					onClick={onDelete}
				>
					<Trash2 className="h-3 w-3" />
				</Button>
			</div>
		</div>
	);
}
