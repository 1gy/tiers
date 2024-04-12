import { atom, useAtom } from "jotai";
import { useCallback } from "preact/hooks";

const openAtom = atom(false);

export const useSettingsDialog = () => {
	const [isOpen, setIsOpen] = useAtom(openAtom);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	return { isOpen, open, close };
};
