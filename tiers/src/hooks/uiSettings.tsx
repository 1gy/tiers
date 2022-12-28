import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { localStorageEffect } from "../libs/recoilEffects";

const cardSize = atom<number>({
	key: "uiSettings.cardSize",
	default: 76,
	effects: [localStorageEffect("uiSettings.cardSize")],
});

export const useCardSize = () => useRecoilValue(cardSize);

export const useSetCardSize = () => useSetRecoilState(cardSize);
