import { createFileRoute, redirect } from "@tanstack/react-router";
import { isValidSection, sectionConfigs } from "@/lib/sections";

export const Route = createFileRoute("/sections/$section/")({
	beforeLoad: ({ params }) => {
		if (!isValidSection(params.section)) {
			throw redirect({ to: "/sections" });
		}
	},
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
