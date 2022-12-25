import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import { MuiBox } from "../../components/presentational/Mui";
import { Page } from "../../components/presentational/Page";
import { TierEditor } from "./TierEditor";

const Title: FC = () => <Appbar text="tiers" />;

const Main: FC<{ defKey: string }> = ({ defKey }) => (
	<ErrorBoundary
		fallback={(error, errorInfo) => (
			<ErrorFallback error={error} errorInfo={errorInfo} />
		)}
	>
		<Suspense fallback={"loading"}>
			<MuiBox
				width="100%"
				height="100%"
				p={1}
				sx={{ overflowY: "scroll", overflowX: "hidden" }}
			>
				<TierEditor defKey={defKey} />
			</MuiBox>
		</Suspense>
	</ErrorBoundary>
);

export const TierEditorPage: FC<{ defKey: string }> = ({ defKey }) => (
	<Page>
		<MainLayout title={<Title />} main={<Main defKey={defKey} />} />
	</Page>
);
