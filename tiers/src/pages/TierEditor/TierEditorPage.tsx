import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { BreadcrumbsSeparator } from "../../components/presentational/BreadcrumbsSeparator";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import {
	MuiBox,
	MuiLink,
	MuiTypography,
} from "../../components/presentational/Mui";
import { Page } from "../../components/presentational/Page";
import { TierEditor } from "./TierEditor";
import { useTierDefinition } from "./store";
import { useNavigate } from "rocon/react";
import { routes } from "../Routes";

const Title: FC<{ defKey: string }> = ({ defKey }) => {
	const { definition } = useTierDefinition(defKey);
	const navigate = useNavigate();

	return (
		<Appbar>
			<MuiLink
				href="#"
				underline="hover"
				color="inherit"
				onClick={() => navigate(routes._.edit)}
			>
				Tiers
			</MuiLink>
			<BreadcrumbsSeparator />
			<MuiTypography>{definition?.title}</MuiTypography>
		</Appbar>
	);
};

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
		<MainLayout
			title={<Title defKey={defKey} />}
			main={<Main defKey={defKey} />}
		/>
	</Page>
);
