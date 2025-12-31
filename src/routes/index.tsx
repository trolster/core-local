import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<div>
			<h1>Welcome to CORE</h1>
			<p>This is your home page.</p>
		</div>
	);
}
