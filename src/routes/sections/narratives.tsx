import { createFileRoute } from "@tanstack/react-router";
import { useNarratives } from "@/lib/api";

export const Route = createFileRoute("/sections/narratives")({
	component: NarrativesPage,
});

function NarrativesPage() {
	const { data: narratives, isLoading, error } = useNarratives();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading narratives...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading narratives: {error.message}
					</p>
				</div>
			</div>
		)
	}

	const primaryNarratives =
		narratives?.filter((n) => n.type === "primary") ?? [];
	const extendedNarratives =
		narratives?.filter((n) => n.type === "extended") ?? [];

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Narratives</h1>
					<p className="text-muted-foreground mt-2">
						Internal and external stories that stabilize identity and communicate
						clearly.
					</p>
				</div>

				{primaryNarratives.length > 0 && (
					<div className="space-y-4">
						<div>
							<h2 className="text-2xl font-semibold">Primary Narratives</h2>
							<p className="text-sm text-muted-foreground mt-1">
								For social settings and casual introductions
							</p>
						</div>
						<div className="space-y-4">
							{primaryNarratives.map((narrative) => (
								<div
									key={narrative.id}
									className="rounded-lg border bg-card p-6 space-y-3"
								>
									<div className="flex items-baseline gap-3">
										<span className="text-sm font-mono text-muted-foreground">
											{narrative.code}
										</span>
										<h3 className="text-xl font-semibold">{narrative.title}</h3>
									</div>

									<p className="text-foreground leading-relaxed">
										{narrative.description}
									</p>

									{narrative.audience && (
										<p className="text-xs text-muted-foreground italic pt-2">
											{narrative.audience}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{extendedNarratives.length > 0 && (
					<div className="space-y-4">
						<div>
							<h2 className="text-2xl font-semibold">Extended Narratives</h2>
							<p className="text-sm text-muted-foreground mt-1">
								For trusted friends and deeper conversations
							</p>
						</div>
						<div className="space-y-4">
							{extendedNarratives.map((narrative) => (
								<div
									key={narrative.id}
									className="rounded-lg border bg-card p-6 space-y-3"
								>
									<div className="flex items-baseline gap-3">
										<span className="text-sm font-mono text-muted-foreground">
											{narrative.code}
										</span>
										<h3 className="text-xl font-semibold">{narrative.title}</h3>
									</div>

									<p className="text-foreground leading-relaxed">
										{narrative.description}
									</p>

									{narrative.audience && (
										<p className="text-xs text-muted-foreground italic pt-2">
											{narrative.audience}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
