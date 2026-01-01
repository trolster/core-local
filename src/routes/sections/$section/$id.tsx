import { createFileRoute, redirect } from "@tanstack/react-router";
import { isValidSection } from "@/lib/sections";
import {
	useDriver,
	useProblem,
	useMission,
	useGoal,
	useChallenge,
	useConstraint,
	useProject,
	useNarrative,
} from "@/lib/api";
import type {
	Driver,
	Problem,
	Mission,
	Goal,
	Challenge,
	Constraint,
	Project,
	Narrative,
} from "@/types/core";

export const Route = createFileRoute("/sections/$section/$id")({
	beforeLoad: ({ params }) => {
		if (!isValidSection(params.section)) {
			throw redirect({ to: "/sections" });
		}
	},
	component: SectionDetail,
});

function SectionDetail() {
	const { section, id } = Route.useParams();

	// Call all hooks unconditionally (React rules)
	const driver = useDriver(section === "drivers" ? id : "");
	const problem = useProblem(section === "problems" ? id : "");
	const mission = useMission(section === "missions" ? id : "");
	const goal = useGoal(section === "goals" ? id : "");
	const challenge = useChallenge(section === "challenges" ? id : "");
	const constraint = useConstraint(section === "constraints" ? id : "");
	const project = useProject(section === "projects" ? id : "");
	const narrative = useNarrative(section === "narratives" ? id : "");

	// Get the active query based on section
	const queries: Record<string, { data: unknown; isLoading: boolean; error: Error | null }> = {
		drivers: driver,
		problems: problem,
		missions: mission,
		goals: goal,
		challenges: challenge,
		constraints: constraint,
		projects: project,
		narratives: narrative,
	};

	const query = queries[section];
	const { data: item, isLoading, error } = query;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-sm text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-sm text-destructive">Error: {error.message}</p>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-sm text-muted-foreground">Item not found</p>
			</div>
		);
	}

	// Render based on section type
	switch (section) {
		case "drivers":
			return <DriverDetail item={item as Driver} />;
		case "problems":
			return <ProblemDetail item={item as Problem} />;
		case "missions":
			return <MissionDetail item={item as Mission} />;
		case "goals":
			return <GoalDetail item={item as Goal} />;
		case "challenges":
			return <ChallengeDetail item={item as Challenge} />;
		case "constraints":
			return <ConstraintDetail item={item as Constraint} />;
		case "projects":
			return <ProjectDetail item={item as Project} />;
		case "narratives":
			return <NarrativeDetail item={item as Narrative} />;
		default:
			return null;
	}
}

// Detail components for each section type

function DriverDetail({ item }: { item: Driver }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				{item.subtitle && (
					<p className="text-base text-muted-foreground mt-1 italic">{item.subtitle}</p>
				)}
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
			{item.details && item.details.length > 0 && (
				<ul className="space-y-2 pt-2">
					{item.details.map((detail, i) => (
						<li key={i} className="flex gap-2 text-sm text-muted-foreground">
							<span className="text-foreground">•</span>
							<span>{detail}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function ProblemDetail({ item }: { item: Problem }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
		</div>
	);
}

function MissionDetail({ item }: { item: Mission }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
		</div>
	);
}

function GoalDetail({ item }: { item: Goal }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				<p className="text-xs text-muted-foreground mt-1">
					Mission: {item.missionCode} · Horizon: {item.horizon}
				</p>
			</div>
			<p className="text-sm leading-relaxed">{item.statement}</p>
			{item.finishLine.length > 0 && (
				<div>
					<h2 className="text-sm font-medium mb-2">Finish Line</h2>
					<ul className="space-y-2">
						{item.finishLine.map((line, i) => (
							<li key={i} className="flex gap-2 text-sm text-muted-foreground">
								<span className="text-foreground">•</span>
								<span>{line}</span>
							</li>
						))}
					</ul>
				</div>
			)}
			<div>
				<h2 className="text-sm font-medium mb-2">Legitimacy</h2>
				<p className="text-sm text-muted-foreground">{item.legitimacy}</p>
			</div>
		</div>
	);
}

function ChallengeDetail({ item }: { item: Challenge }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				<p className="text-xs text-muted-foreground mt-1">Tier {item.tier}</p>
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
		</div>
	);
}

function ConstraintDetail({ item }: { item: Constraint }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				{item.addresses.length > 0 && (
					<p className="text-xs text-muted-foreground mt-1">
						Addresses: {item.addresses.join(", ")}
					</p>
				)}
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
			<div>
				<h2 className="text-sm font-medium mb-2">Mechanism</h2>
				<p className="text-sm text-muted-foreground">{item.mechanism}</p>
			</div>
			{item.failureModes.length > 0 && (
				<div>
					<h2 className="text-sm font-medium mb-2">Failure Modes</h2>
					<ul className="space-y-1">
						{item.failureModes.map((mode, i) => (
							<li key={i} className="flex gap-2 text-sm text-muted-foreground">
								<span className="text-foreground">•</span>
								<span>{mode}</span>
							</li>
						))}
					</ul>
				</div>
			)}
			{item.signals.length > 0 && (
				<div>
					<h2 className="text-sm font-medium mb-2">Signals</h2>
					<ul className="space-y-1">
						{item.signals.map((signal, i) => (
							<li key={i} className="flex gap-2 text-sm text-muted-foreground">
								<span className="text-foreground">•</span>
								<span>{signal}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

function ProjectDetail({ item }: { item: Project }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				<p className="text-xs text-muted-foreground mt-1 capitalize">
					Status: {item.status}
					{item.goalCodes && item.goalCodes.length > 0 && (
						<> · Goals: {item.goalCodes.join(", ")}</>
					)}
				</p>
			</div>
			{item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
		</div>
	);
}

function NarrativeDetail({ item }: { item: Narrative }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				<p className="text-xs text-muted-foreground mt-1 capitalize">
					{item.type}
					{item.audience && <> · {item.audience}</>}
				</p>
			</div>
			<p className="text-sm leading-relaxed">{item.description}</p>
		</div>
	);
}
