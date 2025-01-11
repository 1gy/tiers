import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seasons/$season_id")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/seasons/$season_id"!</div>;
}
