import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sections")({
	component: SectionsLayout,
});

function SectionsLayout() {
	return <Outlet />;
}
