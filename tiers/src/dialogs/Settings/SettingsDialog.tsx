import type { FC } from "react";
import { useCardSize, useSetCardSize } from "../../hooks/uiSettings";
import { useCloseDialog, useIsOpenDialog } from "./store";
import { Button } from "../../components/presentational/Button";
import { Slider } from "../../components/presentational/Slider";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "../../components/presentational/Dialog";

export type SettingsDialogProps = {
	//
};

export const SettingsDialog: FC<SettingsDialogProps> = () => {
	const isOpen = useIsOpenDialog();
	const closeDialog = useCloseDialog();
	const cardSize = useCardSize();
	const setCardSize = useSetCardSize();

	const handleCardSizeChange = (_: Event, newValue: number | number[]) => {
		setCardSize(newValue as number);
	};

	return (
		<Dialog open={isOpen} onClose={closeDialog}>
			<DialogTitle>設定</DialogTitle>
			<DialogContent>
				<Slider
					min={32}
					max={128}
					value={cardSize}
					onChange={handleCardSizeChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>閉じる</Button>
			</DialogActions>
		</Dialog>
	);
};
