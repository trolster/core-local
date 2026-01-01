import { createFileRoute } from "@tanstack/react-router";
import { useConstraints } from "@/lib/api";

export const Route = createFileRoute("/sections/constraints")({
	component: ConstraintsPage,
});

function ConstraintsPage() {
	const { data: constraints, isLoading, error } = useConstraints();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading strategies...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading strategies: {error.message}
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Strategies</h1>
					<p className="text-muted-foreground mt-2">
						Durable intervention patterns designed to weaken specific challenges.
					</p>
				</div>

				<div className="space-y-6">
					{constraints?.map((constraint) => (
						<div
							key={constraint.id}
							className="rounded-lg border bg-card p-6 space-y-4"
						>
							<div className="flex items-baseline gap-3">
								<span className="text-sm font-mono text-muted-foreground">
									{constraint.code}
								</span>
								<h2 className="text-2xl font-semibold">{constraint.title}</h2>
							</div>

							<div className="space-y-3">
								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Addresses
									</p>
									<div className="flex gap-2">
										{constraint.addresses.map((address, index) => (
											<span
												key={index}
												className="px-2 py-1 text-xs font-mono bg-muted rounded"
											>
												{address}
											</span>
										))}
									</div>
								</div>

								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Description
									</p>
									<p className="text-foreground leading-relaxed">
										{constraint.description}
									</p>
								</div>

								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Mechanism
									</p>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{constraint.mechanism}
									</p>
								</div>

								{constraint.failureModes &&
									constraint.failureModes.length > 0 && (
										<div>
											<p className="text-sm font-medium text-muted-foreground mb-2">
												Failure Modes It Prevents
											</p>
											<ul className="space-y-1">
												{constraint.failureModes.map((mode, index) => (
													<li
														key={index}
														className="flex gap-3 text-sm text-muted-foreground"
													>
														<span>•</span>
														<span>{mode}</span>
													</li>
												))}
											</ul>
										</div>
									)}

								{constraint.costStructureAlignment &&
									constraint.costStructureAlignment.length > 0 && (
										<div>
											<p className="text-sm font-medium text-muted-foreground mb-2">
												Cost Structure Alignment
											</p>
											<ul className="space-y-1">
												{constraint.costStructureAlignment.map(
													(alignment, index) => (
														<li
															key={index}
															className="flex gap-3 text-sm text-muted-foreground"
														>
															<span>•</span>
															<span>{alignment}</span>
														</li>
													),
												)}
											</ul>
										</div>
									)}

								{constraint.signals && constraint.signals.length > 0 && (
									<div>
										<p className="text-sm font-medium text-muted-foreground mb-2">
											Signals It's Working
										</p>
										<ul className="space-y-1">
											{constraint.signals.map((signal, index) => (
												<li
													key={index}
													className="flex gap-3 text-sm text-muted-foreground"
												>
													<span>•</span>
													<span>{signal}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
