import { atom, useAtom, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback } from "preact/hooks";

const openAtom = atom(false);

export const useSettingsDialog = () => {
	const [isOpen, setIsOpen] = useAtom(openAtom);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	return { isOpen, open, close };
};

const cardSizeAtom = atomWithStorage("tiers2/settings/cardSize", 76);

export const useCardSize = () => useAtom(cardSizeAtom)[0];

export const useSetCardSize = () => useSetAtom(cardSizeAtom);
