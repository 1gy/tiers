import { ErrorInfo, FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { MainLayout } from "../../components/presentational/MainLayout";
import { MuiBox, MuiTypography } from "../../components/presentational/Mui";
import { Page } from "../../components/presentational/Page";
import { TierEditor } from "./TierEditor";

const Fallback: FC<{ error: Error; errorInfo: ErrorInfo }> = ({
	error,
	errorInfo,
}) => {
	return (
		<MuiBox>
			<MuiTypography>{JSON.stringify(error)}</MuiTypography>
			<MuiTypography>{JSON.stringify(errorInfo)}</MuiTypography>
		</MuiBox>
	);
};

const Title: FC = () => <Appbar text="tiers" />;

const Main: FC = () => (
	<ErrorBoundary
		fallback={(error, errorInfo) => (
			<Fallback error={error} errorInfo={errorInfo} />
		)}
	>
		<Suspense fallback={"loading"}>
			<MuiBox
				width="100%"
				height="100%"
				p={1}
				sx={{ overflowY: "scroll", overflowX: "hidden" }}
			>
				<TierEditor defKey="2022_3" />
			</MuiBox>
		</Suspense>
	</ErrorBoundary>
);

export const TierEditorPage: FC = () => (
	<Page>
		<MainLayout title={<Title />} main={<Main />} />
	</Page>
);
