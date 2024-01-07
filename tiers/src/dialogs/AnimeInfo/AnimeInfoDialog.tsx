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
	ListItemButtonLink,
	ListItemText,
} from "../../components/presentational/List";

type AnilistInfoProps = {};

const AnilistInfo: FC<AnilistInfoProps> = memo(() => {
	const info = useAnimeInfo();
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
