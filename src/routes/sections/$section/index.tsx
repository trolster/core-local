import { createFileRoute } from "@tanstack/react-router";
import { sectionConfigs } from "@/config/sections";

export const Route = createFileRoute("/sections/$section/")({
	component: SectionIndex,
});

function SectionIndex() {
	const { section } = Route.useParams();
	const config = sectionConfigs[section];

	return (
		<div className="flex items-center justify-center h-full">
			<p className="text-sm text-muted-foreground">
				Select a {config?.singular.toLowerCase() || "item"} from the sidebar
			</p>
		</div>
	);
}
