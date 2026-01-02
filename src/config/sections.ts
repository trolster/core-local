import type { ContextCategory } from "@/types/context";
import type { SectionItemBase } from "@/types/section";

export type SectionGroup = "foundation" | "direction" | "execution";

export type SectionConfig = {
	title: string;
	singular: string;
	group: SectionGroup;
	getMetadata?: (item: SectionItemBase) => string | null;
};

export const sectionGroups: Record<SectionGroup, string> = {
	foundation: "Foundation",
	direction: "Direction",
	execution: "Execution",
};

export const sectionConfigs: Record<string, SectionConfig> = {
	drivers: { title: "Drivers", singular: "Driver", group: "foundation" },
	problems: { title: "Problems", singular: "Problem", group: "foundation" },
	missions: { title: "Missions", singular: "Mission", group: "direction" },
	goals: {
		title: "Goals",
		singular: "Goal",
		group: "direction",
		getMetadata: (item) => {
			const goal = item as SectionItemBase & { missionCode: string; horizon: string };
			return `Mission: ${goal.missionCode} · Horizon: ${goal.horizon}`;
		},
	},
	challenges: {
		title: "Challenges",
		singular: "Challenge",
		group: "execution",
		getMetadata: (item) => {
			const challenge = item as SectionItemBase & { tier: number };
			return `Tier ${challenge.tier}`;
		},
	},
	constraints: {
		title: "Constraints",
		singular: "Constraint",
		group: "execution",
		getMetadata: (item) => {
			const constraint = item as SectionItemBase & { addresses: string[] };
			return constraint.addresses.length > 0
				? `Addresses: ${constraint.addresses.join(", ")}`
				: null;
		},
	},
	projects: {
		title: "Projects",
		singular: "Project",
		group: "execution",
		getMetadata: (item) => {
			const project = item as SectionItemBase & { status: string; goalCodes?: string[] };
			const parts = [`Status: ${project.status}`];
			if (project.goalCodes?.length) {
				parts.push(`Goals: ${project.goalCodes.join(", ")}`);
			}
			return parts.join(" · ");
		},
	},
	narratives: {
		title: "Narratives",
		singular: "Narrative",
		group: "execution",
		getMetadata: (item) => {
			const narrative = item as SectionItemBase & { type: string; audience?: string };
			const parts = [narrative.type];
			if (narrative.audience) {
				parts.push(narrative.audience);
			}
			return parts.join(" · ");
		},
	},
};

// Get sections grouped by their group
export function getSectionsByGroup() {
	const groups: Record<SectionGroup, string[]> = {
		foundation: [],
		direction: [],
		execution: [],
	};
	for (const [key, config] of Object.entries(sectionConfigs)) {
		groups[config.group].push(key);
	}
	return groups;
}

export const validSections = Object.keys(sectionConfigs);

export function isValidSection(section: string): section is keyof typeof sectionConfigs {
	return section in sectionConfigs;
}

// Context configuration (one document per category)
export type ContextConfig = {
	title: string;
	description: string;
};

export const contextConfigs: Record<ContextCategory, ContextConfig> = {
	history: {
		title: "History",
		description: "Your personal and professional background",
	},
	current_status: {
		title: "Current Status",
		description: "Where you are now in life and work",
	},
	interests: {
		title: "Interests",
		description: "Topics and activities that engage you",
	},
	wisdom: {
		title: "Wisdom",
		description: "Lessons learned and guiding principles",
	},
	media: {
		title: "Media",
		description: "Books, articles, and content that shaped your thinking",
	},
};

export const validContextCategories = Object.keys(contextConfigs) as ContextCategory[];

export function isValidContextCategory(
	category: string,
): category is ContextCategory {
	return category in contextConfigs;
}
