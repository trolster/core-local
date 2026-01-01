import { createFileRoute } from "@tanstack/react-router";
import { useChallenges } from "@/lib/api";

export const Route = createFileRoute("/challenges")({
	component: ChallengesPage,
});

function ChallengesPage() {
	const { data: challenges, isLoading, error } = useChallenges();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading challenges...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading challenges: {error.message}
					</p>
				</div>
			</div>
		);
	}

	const getTierLabel = (tier: 1 | 2 | 3) => {
		switch (tier) {
			case 1:
				return "Primary Bottleneck";
			case 2:
				return "System Load";
			case 3:
				return "Amplifier";
			default:
				return `Tier ${tier}`;
		}
	};

	const getTierColor = (tier: 1 | 2 | 3) => {
		switch (tier) {
			case 1:
				return "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30";
			case 2:
				return "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
			case 3:
				return "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30";
			default:
				return "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30";
		}
	};

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Challenges</h1>
					<p className="text-muted-foreground mt-2">
						Structural obstacles that prevent progress, organized by impact tier.
					</p>
				</div>

				<div className="space-y-6">
					{challenges?.map((challenge) => (
						<div
							key={challenge.id}
							className="rounded-lg border bg-card p-6 space-y-3"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-baseline gap-3 flex-1">
									<span className="text-sm font-mono text-muted-foreground">
										{challenge.code}
									</span>
									<h2 className="text-2xl font-semibold">{challenge.title}</h2>
								</div>
								<span
									className={`px-3 py-1 text-xs font-medium rounded-full border ${getTierColor(challenge.tier)}`}
								>
									{getTierLabel(challenge.tier)}
								</span>
							</div>

							<p className="text-foreground leading-relaxed">
								{challenge.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
