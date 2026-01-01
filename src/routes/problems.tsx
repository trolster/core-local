import { createFileRoute } from "@tanstack/react-router";
import { useProblems } from "@/lib/api";

export const Route = createFileRoute("/problems")({
	component: ProblemsPage,
});

function ProblemsPage() {
	const { data: problems, isLoading, error } = useProblems();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading problems...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading problems: {error.message}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Problems</h1>
					<p className="text-muted-foreground mt-2">
						Current challenges and obstacles that need to be addressed.
					</p>
				</div>

				<div className="space-y-6">
					{problems?.map((problem) => (
						<div
							key={problem.id}
							className="rounded-lg border bg-card p-6 space-y-3"
						>
							<div className="flex items-baseline gap-3">
								<span className="text-sm font-mono text-muted-foreground">
									{problem.code}
								</span>
								<h2 className="text-2xl font-semibold">{problem.title}</h2>
							</div>

							<p className="text-foreground leading-relaxed">
								{problem.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
