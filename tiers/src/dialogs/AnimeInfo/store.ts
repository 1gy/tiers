import { useCallback } from "react";
import {
	DefaultValue,
	atom,
	selector,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import { AnimeInfo, getAnimeInfo } from "../../apis/anilist";

const animeIdAtom = atom<string>({
	key: "AnimeInfoDialog.animeId",
	default: "",
});

const isOpenAtom = atom<boolean>({
	key: "AnimeInfoDialog.isOpen",
	default: false,
});

const dialogStateAtom = selector<{ isOpen: boolean; animeId: string }>({
	key: "AnimeInfoDialog.state",
	get: ({ get }) => {
		const isOpen = get(isOpenAtom);
		const animeId = get(animeIdAtom);
		return { isOpen, animeId };
	},
	set: ({ set }, value) => {
		if (value instanceof DefaultValue) {
			set(isOpenAtom, value);
			set(animeIdAtom, value);
		} else {
			set(isOpenAtom, value.isOpen);
			set(animeIdAtom, value.animeId);
		}
	},
});

export const useDialogState = () => {
	return useRecoilValue(dialogStateAtom);
};

export const useOpenDialog = () => {
	const setState = useSetRecoilState(dialogStateAtom);
	return useCallback((id: string) => {
		setState({ isOpen: true, animeId: id });
	}, []);
};

export const useCloseDialog = () => {
	const setIsOpen = useSetRecoilState(isOpenAtom);
	return useCallback(() => setIsOpen(false), []);
};

const animeInfoQuery = selector<AnimeInfo>({
	key: "AnimeInfoDialog.animeInfo",
	get: async ({ get }) => {
		const animeId = get(animeIdAtom);
		return await getAnimeInfo(parseInt(animeId, 10));
	},
});

export const useAnimeInfo = () => {
	return useRecoilValue(animeInfoQuery);
};
