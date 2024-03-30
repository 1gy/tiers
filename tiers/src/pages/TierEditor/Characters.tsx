import { FC, Suspense } from "react";
import { Page } from "../../components/presentational/Page";
import { Appbar } from "../../components/presentational/Appbar";
import { Link } from "../../components/presentational/Link";
import { useNavigate } from "rocon/react";
import { routes } from "../Routes";
import { BreadcrumbsSeparator } from "../../components/presentational/BreadcrumbsSeparator";
import { Typography } from "../../components/presentational/Typography";
import { MainLayout } from "../../components/presentational/MainLayout";
import { CharactersTier } from "./CharactersTier";
import { ErrorBoundary } from "../../components/functional/ErrorBoundary";
import { ErrorFallback } from "../../components/presentational/ErrorFallback";
import { css } from "../../../styled-system/css";

const Title: FC = () => {
	const navigate = useNavigate();

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
			<Typography>Characters</Typography>
		</Appbar>
	);
};

const Main: FC<{ id: string }> = ({ id }) => (
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
				<CharactersTier id={id} />
			</div>
		</Suspense>
	</ErrorBoundary>
);

export const Characters: FC<{ id: string }> = ({ id }) => {
	return (
		<Page>
			<MainLayout title={<Title />} main={<Main id={id} />} />
		</Page>
	);
};
