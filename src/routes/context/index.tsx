import { createFileRoute, Link } from "@tanstack/react-router";
import { contextsQueryOptions, useContexts } from "@/api";
import { contextConfigs, validContextCategories } from "@/config/sections";

export const Route = createFileRoute("/context/")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(contextsQueryOptions()),
	component: ContextIndex,
});

function ContextIndex() {
	const { contexts } = useContexts();

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<p className="text-overline">Personal</p>
					<h1 className="text-display mt-1">Context</h1>
					<p className="text-muted-foreground mt-2">
						Personal background and meta-information
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{validContextCategories.map((category) => {
						const config = contextConfigs[category];
						const hasContent = contexts.some((c) => c.category === category);

						return (
							<Link
								key={category}
								to="/context/$category"
								params={{ category }}
								className="group"
							>
								<div className="h-full p-5 rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
									<h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
										{config.title}
									</h3>
									<p className="text-sm text-muted-foreground mt-1">
										{config.description}
									</p>
									{!hasContent && (
										<p className="text-xs text-muted-foreground/60 italic mt-3">
											Not yet written
										</p>
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
