import { FC } from "react";
import { Page } from "../../components/presentational/Page";
import { Appbar } from "../../components/presentational/Appbar";
import { Link } from "../../components/presentational/Link";
import { useNavigate } from "rocon/react";
import { routes } from "../Routes";
import { BreadcrumbsSeparator } from "../../components/presentational/BreadcrumbsSeparator";
import { Typography } from "../../components/presentational/Typography";
import { MainLayout } from "../../components/presentational/MainLayout";

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

const Main: FC<{ id: string }> = ({ id }) => {
	return <div>Characters</div>;
};

export const Characters: FC<{ id: string }> = ({ id }) => {
	return (
		<Page>
			<MainLayout title={<Title />} main={<Main id={id} />} />
		</Page>
	);
};
