import { createFileRoute } from "@tanstack/react-router";
import { useProjects } from "@/lib/api";

export const Route = createFileRoute("/sections/projects")({
	component: ProjectsPage,
});

function ProjectsPage() {
	const { data: projects, isLoading, error } = useProjects();

	if (isLoading) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-muted-foreground">Loading projects...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 max-w-4xl">
				<div className="flex items-center justify-center py-12">
					<p className="text-destructive">
						Error loading projects: {error.message}
					</p>
				</div>
			</div>
		)
	}

	const getStatusColor = (status: "ongoing" | "next" | "done") => {
		switch (status) {
			case "ongoing":
				return "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30";
			case "next":
				return "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
			case "done":
				return "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30";
			default:
				return "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30";
		}
	}

	const getStatusLabel = (status: "ongoing" | "next" | "done") => {
		switch (status) {
			case "ongoing":
				return "Ongoing";
			case "next":
				return "Next";
			case "done":
				return "Done";
			default:
				return status;
		}
	}

	const groupedProjects = {
		ongoing: projects?.filter((p) => p.status === "ongoing") ?? [],
		next: projects?.filter((p) => p.status === "next") ?? [],
		done: projects?.filter((p) => p.status === "done") ?? [],
	}

	return (
		<div className="container mx-auto p-8 max-w-4xl">
			<div className="space-y-8">
				<div>
					<h1 className="text-4xl font-bold tracking-tight">Projects</h1>
					<p className="text-muted-foreground mt-2">
						Long-running efforts that advance goals and create irreversible
						reality.
					</p>
				</div>

				{groupedProjects.ongoing.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-2xl font-semibold">Ongoing</h2>
						<div className="space-y-4">
							{groupedProjects.ongoing.map((project) => (
								<div
									key={project.id}
									className="rounded-lg border bg-card p-6 space-y-3"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-baseline gap-3 flex-1">
											<span className="text-sm font-mono text-muted-foreground">
												{project.code}
											</span>
											<h3 className="text-xl font-semibold">{project.title}</h3>
										</div>
										<span
											className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}
										>
											{getStatusLabel(project.status)}
										</span>
									</div>

									{project.description && (
										<p className="text-foreground leading-relaxed">
											{project.description}
										</p>
									)}

									{project.goalCodes && project.goalCodes.length > 0 && (
										<div className="flex gap-2 pt-2">
											{project.goalCodes.map((code, index) => (
												<span
													key={index}
													className="px-2 py-1 text-xs font-mono bg-muted rounded"
												>
													{code}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{groupedProjects.next.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-2xl font-semibold">Next</h2>
						<div className="space-y-4">
							{groupedProjects.next.map((project) => (
								<div
									key={project.id}
									className="rounded-lg border bg-card p-6 space-y-3"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-baseline gap-3 flex-1">
											<span className="text-sm font-mono text-muted-foreground">
												{project.code}
											</span>
											<h3 className="text-xl font-semibold">{project.title}</h3>
										</div>
										<span
											className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}
										>
											{getStatusLabel(project.status)}
										</span>
									</div>

									{project.description && (
										<p className="text-foreground leading-relaxed">
											{project.description}
										</p>
									)}

									{project.goalCodes && project.goalCodes.length > 0 && (
										<div className="flex gap-2 pt-2">
											{project.goalCodes.map((code, index) => (
												<span
													key={index}
													className="px-2 py-1 text-xs font-mono bg-muted rounded"
												>
													{code}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{groupedProjects.done.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-2xl font-semibold">Done</h2>
						<div className="space-y-4">
							{groupedProjects.done.map((project) => (
								<div
									key={project.id}
									className="rounded-lg border bg-card p-6 space-y-3"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-baseline gap-3 flex-1">
											<span className="text-sm font-mono text-muted-foreground">
												{project.code}
											</span>
											<h3 className="text-xl font-semibold">{project.title}</h3>
										</div>
										<span
											className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}
										>
											{getStatusLabel(project.status)}
										</span>
									</div>

									{project.description && (
										<p className="text-foreground leading-relaxed">
											{project.description}
										</p>
									)}

									{project.goalCodes && project.goalCodes.length > 0 && (
										<div className="flex gap-2 pt-2">
											{project.goalCodes.map((code, index) => (
												<span
													key={index}
													className="px-2 py-1 text-xs font-mono bg-muted rounded"
												>
													{code}
												</span>
											))}
										</div>
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
