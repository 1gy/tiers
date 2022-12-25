import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import { MuiBox } from "../../components/presentational/Mui";
import { Page } from "../../components/presentational/Page";
import { TierList } from "./TierList";

const Title: FC = () => <Appbar text="tiers > list" />;

const Main: FC = () => (
	<ErrorBoundary
		fallback={(error, errorInfo) => (
			<ErrorFallback error={error} errorInfo={errorInfo} />
		)}
	>
		<Suspense fallback={"loading"}>
			<MuiBox width="100%" height="100%" p={1} overflow="hidden">
				<TierList />
			</MuiBox>
		</Suspense>
	</ErrorBoundary>
);

export const TierListPage: FC = () => (
	<Page>
		<MainLayout title={<Title />} main={<Main />} />
	</Page>
);
