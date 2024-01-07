import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import { Page } from "../../components/presentational/Page";
import { TierList } from "./TierList";
import { Typography } from "../../components/presentational/Typography";
import { css } from "../../../styled-system/css";

const Title: FC = () => (
	<Appbar>
		<Typography>Tiers</Typography>
	</Appbar>
);

const Main: FC = () => (
	<ErrorBoundary
		fallback={(error, errorInfo) => (
			<ErrorFallback error={error} errorInfo={errorInfo} />
		)}
	>
		<Suspense fallback={"loading"}>
			<div className={css({ w: "full", h: "full", p: "2", overflow: "auto" })}>
				<TierList />
			</div>
		</Suspense>
	</ErrorBoundary>
);

export const TierListPage: FC = () => (
	<Page>
		<MainLayout title={<Title />} main={<Main />} />
	</Page>
);
