import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="space-y-6">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Welcome to CORE</h1>
					<p className="text-muted-foreground mt-2">
						Your personal productivity and goal tracking application
					</p>
				</div>

				<div className="space-y-4">
					<p className="text-lg">
						Get started by exploring your goals, tracking your progress, and
						building the life you want to live.
					</p>

					<div className="flex gap-4">
						<Button onClick={() => alert("Getting started!")}>
							Get Started
						</Button>
						<Button variant="outline" onClick={() => alert("Learning more!")}>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
