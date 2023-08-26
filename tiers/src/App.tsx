import type { FC } from "react";
import { ErrorBoundary } from "./components/functional/ErrorBoundary";
import { RecoilRoot } from "recoil";
import { RoconRoot } from "rocon/react";
import { Routes } from "./pages/Routes";
import { ErrorFallback } from "./components/presentational/ErrorFallback";

export const App: FC = () => {
	return (
		<ErrorBoundary
			fallback={(error, errorInfo) => (
				<ErrorFallback error={error} errorInfo={errorInfo} />
			)}
		>
			<RecoilRoot>
				<RoconRoot>
					<Routes />
				</RoconRoot>
			</RecoilRoot>
		</ErrorBoundary>
	);
};
