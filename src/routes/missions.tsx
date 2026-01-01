import { createFileRoute } from "@tanstack/react-router";
import { useMissions } from "@/lib/api";

export const Route = createFileRoute("/missions")({
	component: MissionsPage,
});

function MissionsPage() {
	const { data: missions, isLoading, error } = useMissions();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading missions...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading missions: {error.message}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Missions</h1>
					<p className="text-muted-foreground mt-2">
						Strategic directions for transitioning toward sovereignty.
					</p>
				</div>

				<div className="space-y-6">
					{missions?.map((mission) => (
						<div
							key={mission.id}
							className="rounded-lg border bg-card p-6 space-y-3"
						>
							<div className="flex items-baseline gap-3">
								<span className="text-sm font-mono text-muted-foreground">
									{mission.code}
								</span>
								<h2 className="text-2xl font-semibold">{mission.title}</h2>
							</div>

							<p className="text-foreground leading-relaxed">
								{mission.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
