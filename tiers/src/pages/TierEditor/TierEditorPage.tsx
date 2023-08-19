import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { BreadcrumbsSeparator } from "../../components/presentational/BreadcrumbsSeparator";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import {
	MuiBox,
	MuiIconButton,
	MuiLink,
} from "../../components/presentational/Mui";
import { Page } from "../../components/presentational/Page";
import { TierEditor } from "./TierEditor";
import { useNavigate } from "rocon/react";
import { routes } from "../Routes";
import { MuiSettingsIcon } from "../../components/presentational/MuiIcons";
import { SettingsDialog } from "../../dialogs/Settings/SettingsDialog";
import { useOpenDialog } from "../../dialogs/Settings/store";
import { Typography } from "../../components/presentational/Typography";

const Title: FC<{ defKey: string }> = ({ defKey }) => {
	const navigate = useNavigate();
	const openSettingsDialog = useOpenDialog();

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
			<Typography>{defKey}</Typography>

			<MuiBox x-role="spacer" flexGrow={1} />

			<MuiIconButton
				color="inherit"
				sx={{ mr: 1 }}
				onClick={() => openSettingsDialog()}
			>
				<MuiSettingsIcon />
			</MuiIconButton>

			<SettingsDialog />
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
