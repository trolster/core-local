import { useState } from "react";
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useParams,
} from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { SectionDialog } from "@/components/section-dialog";
import { Button } from "@/components/ui/button";
import { sectionQueryOptions, useSection } from "@/api";
import { isValidSection, sectionConfigs } from "@/config/sections";
import type { SectionItemBase } from "@/types/section";

export const Route = createFileRoute("/sections/$section")({
	beforeLoad: ({ params }) => {
		if (!isValidSection(params.section)) {
			throw redirect({ to: "/sections" });
		}
	},
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(sectionQueryOptions(params.section)),
	component: SectionLayout,
});

function SidebarItem({
	item,
	section,
	isSelected,
}: {
	item: SectionItemBase;
	section: string;
	isSelected: boolean;
}) {
	return (
		<Link
			to="/sections/$section/$id"
			params={{ section, id: item.id }}
			className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-150 ${
				isSelected
					? "bg-primary/15 border border-primary/20"
					: "hover:bg-muted border border-transparent"
			}`}
		>
			<div className={`font-medium truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
				{item.title}
			</div>
			<div
				className={`text-[11px] font-mono mt-0.5 ${
					isSelected ? "text-primary/70" : "text-muted-foreground"
				}`}
			>
				{item.code}
			</div>
		</Link>
	);
}

function SectionLayout() {
	const { section = "", id: selectedId } = useParams({ strict: false });
	// useSection subscribes to cache updates (loader data is static after initial load)
	const { data: items = [] } = useSection(section);
	const config = sectionConfigs[section];
	const [createDialogOpen, setCreateDialogOpen] = useState(false);

	return (
		<div className="flex flex-col h-[calc(100vh-40px)]">
			{/* Top bar */}
			<div className="h-12 flex items-center justify-between px-5 border-b border-border bg-card/50">
				<h1 className="text-base font-semibold">{config?.title || "Sections"}</h1>
				{config && (
					<Button
						size="sm"
						variant="outline"
						className="h-8 px-3 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30"
						onClick={() => setCreateDialogOpen(true)}
					>
						<Plus className="h-3.5 w-3.5 mr-1.5" />
						New {config.singular}
					</Button>
				)}
			</div>

			{/* Main area with sidebar and content */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<aside className="w-60 border-r border-border bg-muted/30 overflow-y-auto">
					<div className="p-2 space-y-1">
						{items.length > 0 ? (
							items.map((item) => (
								<SidebarItem
									key={item.id}
									item={item}
									section={section}
									isSelected={item.id === selectedId}
								/>
							))
						) : (
							<div className="px-3 py-8 text-sm text-muted-foreground text-center">
								No {config?.title.toLowerCase() || "items"} yet
							</div>
						)}
					</div>
				</aside>

				{/* Main content */}
				<main className="flex-1 overflow-y-auto bg-background">
					<Outlet />
				</main>
			</div>

			<SectionDialog
				section={section}
				mode="create"
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
			/>
		</div>
	);
}
