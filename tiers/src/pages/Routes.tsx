import type { FC } from "react";
import Rocon, { useRoutes } from "rocon/react";
import { ErrorBoundary } from "../components/functional/ErrorBoundary";
import { ErrorFallback } from "../components/presentational/ErrorFallback";
import { TierListPage } from "./TierEditor/TierListPage";
import { TierViewPage } from "./TierEditor/TierViewPage";

export const charactersRoutes = Rocon.Path().any("id", {
	action: ({ id }) => <>{id}</>,
});

export const routes = Rocon.Root({ root: { pathname: "/tiers", state: null } })
	.attach(Rocon.Path())
	.exact({ action: () => <TierListPage /> })
	.any("id", { action: ({ id }) => <TierViewPage defKey={id} /> })
	.route("c", (route) => route.attach(charactersRoutes));

export const Routes: FC = () => {
	return (
		<ErrorBoundary
			fallback={(error, errorInfo) => (
				<ErrorFallback error={error} errorInfo={errorInfo} />
			)}
		>
			{useRoutes(routes)}
		</ErrorBoundary>
	);
};
