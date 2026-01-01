export type SectionConfig = {
	title: string;
	singular: string;
};

export const sectionConfigs: Record<string, SectionConfig> = {
	drivers: { title: "Drivers", singular: "Driver" },
	problems: { title: "Problems", singular: "Problem" },
	missions: { title: "Missions", singular: "Mission" },
	goals: { title: "Goals", singular: "Goal" },
	challenges: { title: "Challenges", singular: "Challenge" },
	constraints: { title: "Strategies", singular: "Strategy" },
	projects: { title: "Projects", singular: "Project" },
	narratives: { title: "Narratives", singular: "Narrative" },
};

export const validSections = Object.keys(sectionConfigs);

export function isValidSection(section: string): section is keyof typeof sectionConfigs {
	return section in sectionConfigs;
}
