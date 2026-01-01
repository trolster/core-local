import { createFileRoute } from "@tanstack/react-router";
import { useGoals } from "@/lib/api";

export const Route = createFileRoute("/goals")({
	component: GoalsPage,
});

function GoalsPage() {
	const { data: goals, isLoading, error } = useGoals();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading goals...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">Error loading goals: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Goals</h1>
					<p className="text-muted-foreground mt-2">
						Specific, time-bound outcomes that translate missions into action.
					</p>
				</div>

				<div className="space-y-6">
					{goals?.map((goal) => (
						<div
							key={goal.id}
							className="rounded-lg border bg-card p-6 space-y-4"
						>
							<div className="flex items-baseline gap-3">
								<span className="text-sm font-mono text-muted-foreground">
									{goal.code}
								</span>
								<h2 className="text-2xl font-semibold">{goal.title}</h2>
							</div>

							<div className="space-y-3">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Statement
									</p>
									<p className="text-foreground leading-relaxed">
										{goal.statement}
									</p>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Mission
										</p>
										<p className="text-foreground font-mono text-sm">
											{goal.missionCode}
										</p>
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Horizon
										</p>
										<p className="text-foreground">{goal.horizon}</p>
									</div>
								</div>

								{goal.finishLine && goal.finishLine.length > 0 && (
									<div>
										<p className="text-sm font-medium text-muted-foreground mb-2">
											Finish Line
										</p>
										<ul className="space-y-2">
											{goal.finishLine.map((line, index) => (
												<li
													key={index}
													className="flex gap-3 text-sm text-foreground"
												>
													<span className="text-muted-foreground">•</span>
													<span>{line}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								<div>
									<p className="text-sm font-medium text-muted-foreground mb-2">
										Legitimacy
									</p>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{goal.legitimacy}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
