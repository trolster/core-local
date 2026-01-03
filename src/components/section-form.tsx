import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type SectionFormData = {
	code: string;
	title: string;
	body: string;
	// Goal fields
	missionCode?: string;
	horizon?: string;
	// Challenge fields
	tier?: 1 | 2 | 3;
	// Constraint fields
	addresses?: string[];
	// Project fields
	status?: "ongoing" | "next" | "done";
	goalCodes?: string[];
	// Narrative fields
	type?: "primary" | "extended";
	audience?: string;
};

interface SectionFormProps {
	section: string;
	defaultValues?: Partial<SectionFormData>;
	onSubmit: (data: SectionFormData) => void;
	id: string;
}

export function SectionForm({
	section,
	defaultValues,
	onSubmit,
	id,
}: SectionFormProps) {
	const codeId = useId();
	const titleId = useId();
	const bodyId = useId();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const data: SectionFormData = {
			code: formData.get("code") as string,
			title: formData.get("title") as string,
			body: formData.get("body") as string,
		};

		// Add section-specific fields
		if (section === "goals") {
			data.missionCode = formData.get("missionCode") as string;
			data.horizon = formData.get("horizon") as string;
		} else if (section === "challenges") {
			data.tier = Number(formData.get("tier")) as 1 | 2 | 3;
		} else if (section === "constraints") {
			const addressesStr = formData.get("addresses") as string;
			data.addresses = addressesStr
				? addressesStr.split(",").map((s) => s.trim()).filter(Boolean)
				: [];
		} else if (section === "projects") {
			data.status = formData.get("status") as "ongoing" | "next" | "done";
			const goalCodesStr = formData.get("goalCodes") as string;
			data.goalCodes = goalCodesStr
				? goalCodesStr.split(",").map((s) => s.trim()).filter(Boolean)
				: [];
		} else if (section === "narratives") {
			data.type = formData.get("type") as "primary" | "extended";
			const audience = formData.get("audience") as string;
			if (audience) data.audience = audience;
		}

		onSubmit(data);
	}

	return (
		<form id={id} onSubmit={handleSubmit} className="space-y-5">
			{/* Basic Info */}
			<fieldset className="space-y-3 rounded-lg border border-border p-4">
				<legend className="text-overline px-2">Basic Info</legend>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor={codeId} className="text-xs font-medium">
							Code
						</Label>
						<Input
							id={codeId}
							name="code"
							defaultValue={defaultValues?.code}
							placeholder="e.g. DRV-001"
							className="h-9 text-sm"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor={titleId} className="text-xs font-medium">
							Title
						</Label>
						<Input
							id={titleId}
							name="title"
							defaultValue={defaultValues?.title}
							placeholder="Enter title"
							className="h-9 text-sm"
							required
						/>
					</div>
				</div>
			</fieldset>

			{/* Section-specific fields */}
			{section === "goals" && <GoalFields defaultValues={defaultValues} />}
			{section === "challenges" && (
				<ChallengeFields defaultValues={defaultValues} />
			)}
			{section === "constraints" && (
				<ConstraintFields defaultValues={defaultValues} />
			)}
			{section === "projects" && (
				<ProjectFields defaultValues={defaultValues} />
			)}
			{section === "narratives" && (
				<NarrativeFields defaultValues={defaultValues} />
			)}

			{/* Content */}
			<fieldset className="space-y-3 rounded-lg border border-border p-4">
				<legend className="text-overline px-2">Content</legend>
				<div className="space-y-2">
					<Label htmlFor={bodyId} className="text-xs font-medium">
						Body (Markdown)
					</Label>
					<Textarea
						id={bodyId}
						name="body"
						defaultValue={defaultValues?.body}
						placeholder="Enter content in markdown..."
						className="min-h-[180px] text-sm font-mono"
						required
					/>
				</div>
			</fieldset>
		</form>
	);
}

function GoalFields({
	defaultValues,
}: { defaultValues?: Partial<SectionFormData> }) {
	const missionCodeId = useId();
	const horizonId = useId();

	return (
		<fieldset className="space-y-3 rounded-lg border border-border p-4">
			<legend className="text-overline px-2">Goal Details</legend>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor={missionCodeId} className="text-xs font-medium">
						Mission Code
					</Label>
					<Input
						id={missionCodeId}
						name="missionCode"
						defaultValue={defaultValues?.missionCode}
						placeholder="e.g. MSN-001"
						className="h-9 text-sm"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor={horizonId} className="text-xs font-medium">
						Horizon
					</Label>
					<Input
						id={horizonId}
						name="horizon"
						defaultValue={defaultValues?.horizon}
						placeholder="e.g. 2025"
						className="h-9 text-sm"
						required
					/>
				</div>
			</div>
		</fieldset>
	);
}

function ChallengeFields({
	defaultValues,
}: { defaultValues?: Partial<SectionFormData> }) {
	return (
		<fieldset className="space-y-3 rounded-lg border border-border p-4">
			<legend className="text-overline px-2">Challenge Details</legend>
			<div className="space-y-2">
				<Label className="text-xs font-medium">Tier</Label>
				<Select
					name="tier"
					defaultValue={defaultValues?.tier?.toString() || "1"}
				>
					<SelectTrigger className="h-9 text-sm">
						<SelectValue placeholder="Select tier" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Tier 1</SelectItem>
						<SelectItem value="2">Tier 2</SelectItem>
						<SelectItem value="3">Tier 3</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</fieldset>
	);
}

function ConstraintFields({
	defaultValues,
}: { defaultValues?: Partial<SectionFormData> }) {
	const addressesId = useId();

	return (
		<fieldset className="space-y-3 rounded-lg border border-border p-4">
			<legend className="text-overline px-2">Constraint Details</legend>
			<div className="space-y-2">
				<Label htmlFor={addressesId} className="text-xs font-medium">
					Addresses (comma-separated codes)
				</Label>
				<Input
					id={addressesId}
					name="addresses"
					defaultValue={defaultValues?.addresses?.join(", ")}
					placeholder="e.g. CHG-001, CHG-002"
					className="h-9 text-sm"
				/>
			</div>
		</fieldset>
	);
}

function ProjectFields({
	defaultValues,
}: { defaultValues?: Partial<SectionFormData> }) {
	const goalCodesId = useId();

	return (
		<fieldset className="space-y-3 rounded-lg border border-border p-4">
			<legend className="text-overline px-2">Project Details</legend>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label className="text-xs font-medium">Status</Label>
					<Select
						name="status"
						defaultValue={defaultValues?.status || "ongoing"}
					>
						<SelectTrigger className="h-9 text-sm">
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ongoing">Ongoing</SelectItem>
							<SelectItem value="next">Next</SelectItem>
							<SelectItem value="done">Done</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor={goalCodesId} className="text-xs font-medium">
						Goal Codes (comma-separated)
					</Label>
					<Input
						id={goalCodesId}
						name="goalCodes"
						defaultValue={defaultValues?.goalCodes?.join(", ")}
						placeholder="e.g. GOL-001, GOL-002"
						className="h-9 text-sm"
					/>
				</div>
			</div>
		</fieldset>
	);
}

function NarrativeFields({
	defaultValues,
}: { defaultValues?: Partial<SectionFormData> }) {
	const audienceId = useId();

	return (
		<fieldset className="space-y-3 rounded-lg border border-border p-4">
			<legend className="text-overline px-2">Narrative Details</legend>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label className="text-xs font-medium">Type</Label>
					<Select
						name="type"
						defaultValue={defaultValues?.type || "primary"}
					>
						<SelectTrigger className="h-9 text-sm">
							<SelectValue placeholder="Select type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="primary">Primary</SelectItem>
							<SelectItem value="extended">Extended</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor={audienceId} className="text-xs font-medium">
						Audience (optional)
					</Label>
					<Input
						id={audienceId}
						name="audience"
						defaultValue={defaultValues?.audience}
						placeholder="e.g. Investors"
						className="h-9 text-sm"
					/>
				</div>
			</div>
		</fieldset>
	);
}
