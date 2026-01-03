import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
	text: string;
	className?: string;
	variant?: "inline" | "inline-lg" | "header";
}

export function CopyButton({
	text,
	className,
	variant = "inline",
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			// Clipboard API failed - fail silently
		}
	}, [text]);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => setCopied(false), 2000);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	const sizeClasses = {
		inline: { button: "h-6 w-6 p-0", icon: "h-3 w-3" },
		"inline-lg": { button: "h-7 w-7 p-0", icon: "h-3.5 w-3.5" },
		header: { button: "", icon: "h-4 w-4" },
	};

	const { button: buttonSize, icon: iconSize } = sizeClasses[variant];
	const isHeader = variant === "header";

	return (
		<Button
			size="sm"
			variant="ghost"
			className={cn(
				"text-muted-foreground",
				buttonSize,
				isHeader && "hover:text-primary hover:bg-primary/10",
				className,
			)}
			onClick={handleCopy}
			aria-label={copied ? "Copied" : "Copy to clipboard"}
		>
			{copied ? (
				<Check className={cn(iconSize, "text-green-600")} />
			) : (
				<Copy className={iconSize} />
			)}
		</Button>
	);
}
