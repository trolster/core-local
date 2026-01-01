import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { sectionItemQueryOptions } from "@/lib/api";
import { sectionConfigs } from "@/lib/sections";
import type { SectionItemBase } from "@/types/section";

export const Route = createFileRoute("/sections/$section/$id")({
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			sectionItemQueryOptions(params.section, params.id),
		),
	component: SectionDetail,
});

function SectionDetail() {
	const { section } = Route.useParams();
	const item = Route.useLoaderData() as SectionItemBase;
	const config = sectionConfigs[section];
	const metadata = config?.getMetadata?.(item);

	return (
		<div className="p-6 max-w-2xl space-y-4">
			<div>
				<span className="text-xs font-mono text-muted-foreground">
					{item.code}
				</span>
				<h1 className="text-2xl font-semibold mt-1">{item.title}</h1>
				{metadata && (
					<p className="text-xs text-muted-foreground mt-1 capitalize">
						{metadata}
					</p>
				)}
			</div>
			<div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed">
				<ReactMarkdown>{item.body}</ReactMarkdown>
			</div>
		</div>
	);
}
