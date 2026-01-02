import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
					<h1 className="text-4xl font-bold tracking-tight">Context</h1>
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
							>
								<Button
									variant="outline"
									className="w-full h-auto p-4 flex flex-col items-start gap-1"
								>
									<span className="font-medium">{config.title}</span>
									<span className="text-xs text-muted-foreground font-normal">
										{config.description}
									</span>
									{!hasContent && (
										<span className="text-xs text-muted-foreground/60 italic mt-1">
											Not yet written
										</span>
									)}
								</Button>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
