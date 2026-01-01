import { createFileRoute } from "@tanstack/react-router";
import { useDrivers } from "@/lib/api";

export const Route = createFileRoute("/sections/drivers")({
	component: DriversPage,
});

function DriversPage() {
	const { data: drivers, isLoading, error } = useDrivers();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading drivers...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">Error loading drivers: {error.message}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Drivers</h1>
					<p className="text-muted-foreground mt-2">
						The conditions under which life feels real, meaningful, and
						legitimate.
					</p>
				</div>

				<div className="space-y-6">
					{drivers?.map((driver) => (
						<div
							key={driver.id}
							className="rounded-lg border bg-card p-6 space-y-3"
						>
							<div className="flex items-baseline gap-3">
								<span className="text-sm font-mono text-muted-foreground">
									{driver.code}
								</span>
								<h2 className="text-2xl font-semibold">{driver.title}</h2>
							</div>

							{driver.subtitle && (
								<p className="text-lg text-muted-foreground italic">
									{driver.subtitle}
								</p>
							)}

							<p className="text-foreground leading-relaxed">
								{driver.description}
							</p>

							{driver.details && driver.details.length > 0 && (
								<ul className="space-y-2 pt-2">
									{driver.details.map((detail, index) => (
										<li
											key={index}
											className="flex gap-3 text-sm text-muted-foreground"
										>
											<span className="text-foreground">•</span>
											<span>{detail}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
