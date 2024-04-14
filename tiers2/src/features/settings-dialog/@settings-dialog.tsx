import { css } from "@styled-system/css";
import type { FunctionalComponent } from "preact";
import { Button, Slider } from "../ui";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "../ui/@dialog";
import {
	useCardSize,
	useSetCardSize,
	useSettingsDialog,
} from "./settings-dialog.usecase";

export const SettingsDialog: FunctionalComponent = () => {
	const { isOpen, close } = useSettingsDialog();
	const cardSize = useCardSize();
	const setCardSize = useSetCardSize();

	return (
		<Dialog open={isOpen} onClose={close}>
			<DialogTitle>設定</DialogTitle>
			<DialogContent>
				<Slider
					min={32}
					max={128}
					value={cardSize}
					onChange={(v) => setCardSize(v)}
					className={css({ w: "full" })}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>閉じる</Button>
			</DialogActions>
		</Dialog>
	);
};
