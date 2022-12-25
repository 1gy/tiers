import type { FC } from "react";
import Rocon, { useRoutes, Redirect } from "rocon/react";
import { ErrorBoundary } from "../components/functional/ErrorBoundary";
import { ErrorFallback } from "../components/presentational/ErrorFallback";
import { TierEditorPage } from "./TierEditor";
import { TierListPage } from "./TierEditor/TierListPage";

export const IndexPage: FC = () => {
	return <Redirect route={routes._.edit} />;
};

export const routes = Rocon.Path()
	.exact({ action: () => <IndexPage /> })
	.route("edit", (route) => route.action(() => <TierListPage />));

export const editorRoutes = routes._.edit
	.attach(Rocon.Path().any("id"))
	.anyRoute.attach(Rocon.Path())
	.exact({ action: ({ id }) => <TierEditorPage defKey={id} /> });

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
