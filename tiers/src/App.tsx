import type { FC } from "react";
import { MuiCssBaseline } from "./components/presentational/Mui";
import { ErrorBoundary } from "./components/functional/ErrorBoundary";
import { RecoilRoot } from "recoil";
import { RoconRoot } from "rocon/react";
import { Routes } from "./pages/Routes";

export const App: FC = () => {
	return (
		<ErrorBoundary>
			<RecoilRoot>
				<MuiCssBaseline />
				<RoconRoot>
					<Routes />
				</RoconRoot>
			</RecoilRoot>
		</ErrorBoundary>
	);
};
