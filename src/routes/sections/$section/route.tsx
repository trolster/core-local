import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useParams,
} from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionQueryOptions } from "@/lib/api";
import { isValidSection, sectionConfigs } from "@/lib/sections";

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

type SidebarItem = {
	id: string;
	code: string;
	title: string;
};

function SectionLayout() {
	const { section = "", id: selectedId } = useParams({ strict: false });
	const items = Route.useLoaderData() as SidebarItem[];
	const config = sectionConfigs[section];

	return (
		<div className="flex flex-col h-[calc(100vh-28px)]">
			{/* Top bar */}
			<div className="h-10 flex items-center justify-between px-4 border-b border-border/40 bg-background/50">
				<h1 className="text-sm font-medium">{config?.title || "Sections"}</h1>
				{config && (
					<Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
						<Plus className="h-3.5 w-3.5 mr-1" />
						New {config.singular}
					</Button>
				)}
			</div>

			{/* Main area with sidebar and content */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<aside className="w-56 border-r border-border/40 bg-background/30 overflow-y-auto">
					<div className="p-1">
						{items.length > 0 ? (
							items.map((item) => (
								<Link
									key={item.id}
									to={`/sections/${section}/${item.id}` as string}
									className={`block w-full text-left px-2 py-1.5 text-[13px] rounded transition-colors ${
										item.id === selectedId
											? "bg-primary text-primary-foreground"
											: "hover:bg-foreground/5"
									}`}
								>
									<div className="font-medium truncate">{item.title}</div>
									<div
										className={`text-[11px] ${
											item.id === selectedId
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										}`}
									>
										{item.code}
									</div>
								</Link>
							))
						) : (
							<div className="px-2 py-1 text-xs text-muted-foreground">
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
		</div>
	);
}
