import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isOpenAtom = atom<boolean>({
	key: "SettingsDialog.isOpen",
	default: false,
});

export const useIsOpenDialog = () => {
	return useRecoilValue(isOpenAtom);
};

export const useOpenDialog = () => {
	const setIsOpen = useSetRecoilState(isOpenAtom);
	return useCallback(() => setIsOpen(true), []);
};

export const useCloseDialog = () => {
	const setIsOpen = useSetRecoilState(isOpenAtom);
	return useCallback(() => setIsOpen(false), []);
};
