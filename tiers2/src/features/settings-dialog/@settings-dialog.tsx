import type { FunctionalComponent } from "preact";
import { Button } from "../ui";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "../ui/dialog";
import { useSettingsDialog } from "./settings-dialog.usecase";

export const SettingsDialog: FunctionalComponent = () => {
	const { isOpen, close } = useSettingsDialog();

	return (
		<Dialog open={isOpen} onClose={close}>
			<DialogTitle>設定</DialogTitle>
			<DialogContent>aa</DialogContent>
			<DialogActions>
				<Button onClick={close}>閉じる</Button>
			</DialogActions>
		</Dialog>
	);
};
