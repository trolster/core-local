import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sections/")({
	component: SectionsIndex,
});

function SectionsIndex() {
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
					<div>
						<h2 className="text-2xl font-semibold mb-4">Foundation</h2>
						<div className="grid grid-cols-2 gap-4">
							<Link to="/sections/$section" params={{ section: "drivers" }}>
								<Button variant="outline" className="w-full justify-start">
									Drivers
								</Button>
							</Link>
							<Link to="/sections/$section" params={{ section: "problems" }}>
								<Button variant="outline" className="w-full justify-start">
									Problems
								</Button>
							</Link>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">Direction</h2>
						<div className="grid grid-cols-2 gap-4">
							<Link to="/sections/$section" params={{ section: "missions" }}>
								<Button variant="outline" className="w-full justify-start">
									Missions
								</Button>
							</Link>
							<Link to="/sections/$section" params={{ section: "goals" }}>
								<Button variant="outline" className="w-full justify-start">
									Goals
								</Button>
							</Link>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">Execution</h2>
						<div className="grid grid-cols-2 gap-4">
							<Link to="/sections/$section" params={{ section: "challenges" }}>
								<Button variant="outline" className="w-full justify-start">
									Challenges
								</Button>
							</Link>
							<Link to="/sections/$section" params={{ section: "constraints" }}>
								<Button variant="outline" className="w-full justify-start">
									Strategies
								</Button>
							</Link>
							<Link to="/sections/$section" params={{ section: "projects" }}>
								<Button variant="outline" className="w-full justify-start">
									Projects
								</Button>
							</Link>
							<Link to="/sections/$section" params={{ section: "narratives" }}>
								<Button variant="outline" className="w-full justify-start">
									Narratives
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
