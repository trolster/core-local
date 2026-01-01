import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { sectionItemQueryOptions } from "@/lib/api";
import type {
	Challenge,
	Constraint,
	Driver,
	Goal,
	Mission,
	Narrative,
	Problem,
	Project,
} from "@/types/section";

export const Route = createFileRoute("/sections/$section/$id")({
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			sectionItemQueryOptions(params.section, params.id),
		),
	component: SectionDetail,
});

function SectionDetail() {
	const { section } = Route.useParams();
	const item = Route.useLoaderData();

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

// Shared markdown body component
function MarkdownBody({ content }: { content: string }) {
	return (
		<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
}

// Detail components for each section type

function DriverDetail({ item }: { item: Driver }) {
	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">{item.code}</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
			</div>
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
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
			<MarkdownBody content={item.body} />
		</div>
	);
}
