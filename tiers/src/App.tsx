import type { FC } from "react";
import { MuiCssBaseline } from "./components/presentational/Mui";
import { ErrorBoundary } from "./components/functional/ErrorBoundary";
import { RecoilRoot } from "recoil";
import { TierEditorPage } from "./pages/TierEditor";

export const App: FC = () => {
	return (
		<ErrorBoundary>
			<RecoilRoot>
				<MuiCssBaseline />
				<TierEditorPage />
			</RecoilRoot>
		</ErrorBoundary>
	);
};
