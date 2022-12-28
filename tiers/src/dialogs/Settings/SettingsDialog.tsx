import type { FC } from "react";
import {
	MuiButton,
	MuiDialog,
	MuiDialogActions,
	MuiDialogContent,
	MuiDialogContentText,
	MuiDialogTitle,
	MuiSlider,
} from "../../components/presentational/Mui";
import { useCardSize, useSetCardSize } from "../../hooks/uiSettings";
import { useCloseDialog, useIsOpenDialog } from "./store";

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
		<MuiDialog open={isOpen} onClose={closeDialog} fullWidth>
			<MuiDialogTitle>設定</MuiDialogTitle>
			<MuiDialogContent>
				<MuiDialogContentText>
					<MuiSlider
						sx={{ mt: 4 }}
						valueLabelDisplay="on"
						min={32}
						max={128}
						value={cardSize}
						onChange={handleCardSizeChange}
					/>
				</MuiDialogContentText>
			</MuiDialogContent>
			<MuiDialogActions>
				<MuiButton onClick={closeDialog}>閉じる</MuiButton>
			</MuiDialogActions>
		</MuiDialog>
	);
};
