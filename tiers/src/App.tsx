import type { FC } from "react";
import { MuiCssBaseline } from "./components/presentational/Mui";
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
				<MuiCssBaseline />
				<RoconRoot>
					<Routes />
				</RoconRoot>
			</RecoilRoot>
		</ErrorBoundary>
	);
};
