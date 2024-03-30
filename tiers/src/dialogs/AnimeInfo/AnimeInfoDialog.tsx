import { memo, type FC, Suspense } from "react";
import { useAnimeInfo, useCloseDialog, useDialogState } from "./store";
import { Button } from "../../components/presentational/Button";
import {
	Dialog,
	DialogActions,
	DialogContent,
} from "../../components/presentational/Dialog";
import { Typography } from "../../components/presentational/Typography";
import { css } from "../../../styled-system/css";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemButtonLink,
	ListItemText,
} from "../../components/presentational/List";
import { useNavigate } from "rocon/react";
import { charactersRoutes } from "../../pages/Routes";

type AnilistInfoProps = {};

const AnilistInfo: FC<AnilistInfoProps> = memo(() => {
	const info = useAnimeInfo();
	const navigate = useNavigate();

	return (
		<div>
			<Typography variant="h4">{info.title}</Typography>
			<div className={css({ display: "flex", margin: "1" })}>
				<div className={css({ w: "50%", maxH: "50vh", overflow: "auto" })}>
					<img src={info.coverImage} alt="" />
				</div>
				<div className={css({ w: "50%", maxH: "50vh", overflow: "auto" })}>
					<List>
						{info.externalLinks.map((link) => (
							<ListItem key={link.url}>
								<ListItemButtonLink href={link.url}>
									<ListItemText>{link.site}</ListItemText>
								</ListItemButtonLink>
							</ListItem>
						))}
						<ListItem>
							<ListItemButton
								onClick={() =>
									navigate(charactersRoutes.anyRoute, {
										id: info.id.toString(),
									})
								}
							>
								<ListItemText className={css({ textDecoration: "underline" })}>
									Characters
								</ListItemText>
							</ListItemButton>
						</ListItem>
					</List>
				</div>
			</div>
		</div>
	);
});

export type AnimeInfoDialogProps = {
	//
};

export const AnimeInfoDialog: FC<AnimeInfoDialogProps> = () => {
	const closeDialog = useCloseDialog();
	const state = useDialogState();

	return (
		<Dialog open={state.isOpen} onClose={closeDialog}>
			<DialogContent>
				<Suspense fallback={<div>Loading...</div>}>
					<AnilistInfo />
				</Suspense>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>閉じる</Button>
			</DialogActions>
		</Dialog>
	);
};
