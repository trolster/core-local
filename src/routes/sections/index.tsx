import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	type SectionGroup,
	getSectionsByGroup,
	sectionConfigs,
	sectionGroups,
} from "@/config/sections";

export const Route = createFileRoute("/sections/")({
	component: SectionsIndex,
});

const groupOrder: SectionGroup[] = ["foundation", "direction", "execution"];

function SectionsIndex() {
	const sectionsByGroup = getSectionsByGroup();

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">CORE Sections</h1>
					<p className="text-muted-foreground mt-2">
						Navigate to any section of your CORE system
					</p>
				</div>

				<div className="space-y-6">
					{groupOrder.map((group) => (
						<div key={group}>
							<h2 className="text-2xl font-semibold mb-4">
								{sectionGroups[group]}
							</h2>
							<div className="grid grid-cols-2 gap-4">
								{sectionsByGroup[group].map((sectionKey) => (
									<Link
										key={sectionKey}
										to="/sections/$section"
										params={{ section: sectionKey }}
									>
										<Button variant="outline" className="w-full justify-start">
											{sectionConfigs[sectionKey].title}
										</Button>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
