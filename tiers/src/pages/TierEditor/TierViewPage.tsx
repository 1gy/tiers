import { FC, Suspense } from "react";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { Appbar } from "../../components/presentational/Appbar";
import { BreadcrumbsSeparator } from "../../components/presentational/BreadcrumbsSeparator";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { MainLayout } from "../../components/presentational/MainLayout";
import { Page } from "../../components/presentational/Page";
import { useNavigate } from "rocon/react";
import { routes } from "../Routes";
import { SettingsDialog } from "../../dialogs/Settings/SettingsDialog";
import { useOpenDialog } from "../../dialogs/Settings/store";
import { Typography } from "../../components/presentational/Typography";
import { IconButton } from "../../components/presentational/IconButton";
import { css } from "../../../styled-system/css";
import { SettingsIcon } from "../../components/presentational/Icons";
import { Link } from "../../components/presentational/Link";
import { AnimeTierView } from "./TierView";
import { AnimeInfoDialog } from "../../dialogs/AnimeInfo/AnimeInfoDialog";

const Title: FC<{ defKey: string }> = ({ defKey }) => {
	const navigate = useNavigate();
	const openSettingsDialog = useOpenDialog();

	return (
		<Appbar>
			<Link
				underline="hover"
				color="inherit"
				onClick={() => navigate(routes.exactRoute)}
			>
				Tiers
			</Link>
			<BreadcrumbsSeparator />
			<Typography>{defKey}</Typography>

			<div x-role="spacer" className={css({ flexGrow: 1 })} />

			<IconButton
				color="inherit"
				className={css({ mr: "2" })}
				onClick={() => openSettingsDialog()}
			>
				<SettingsIcon />
			</IconButton>

			<SettingsDialog />
			<AnimeInfoDialog />
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
			<div
				className={css({
					w: "full",
					h: "full",
					p: "2",
					overflowY: "scroll",
					overflowX: "hidden",
				})}
			>
				<AnimeTierView defKey={defKey} />
			</div>
		</Suspense>
	</ErrorBoundary>
);

export const TierViewPage: FC<{ defKey: string }> = ({ defKey }) => (
	<Page>
		<MainLayout
			title={<Title defKey={defKey} />}
			main={<Main defKey={defKey} />}
		/>
	</Page>
);
