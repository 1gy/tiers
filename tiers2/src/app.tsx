import type { FunctionComponent } from "preact";
import { Suspense } from "preact/compat";
import { AppRoutes } from "./routes";

export const App: FunctionComponent = () => (
	<Suspense fallback="loading">
		<AppRoutes />
	</Suspense>
);
