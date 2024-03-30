import {
	AtomEffect,
	atomFamily,
	selector,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import {
	TierDefinition,
	TierKey,
	Tiers,
	getTiers,
	TierData,
	getTierData,
	standardTiers,
} from "../../apis/tiers";
import type { DeepNullable } from "../../libs/types";
import { CharactersInfo, getCharacterInfo } from "../../apis/anilist";

const tiersQuery = selector<Tiers>({
	key: "tiers",
	get: async () => {
		return await getTiers();
	},
});

export const useTiers = () => useRecoilValue(tiersQuery);

export const uncategorizedTier: TierDefinition = {
	key: "uncategorized",
	color: "gray",
	label: "",
};

const normalizeMapping = (
	tierData: TierData,
	mapping: DeepNullable<TierMapping> | undefined,
) => {
	const idSet = new Set<string>(Object.keys(tierData.images));
	const res: TierMapping = { mappings: {} };
	for (const tier of standardTiers) {
		if (mapping?.mappings?.[tier.key]?.ids) {
			const ids: string[] = [];
			mapping.mappings[tier.key]?.ids?.forEach((id) => {
				if (!id) {
					return;
				}
				if (idSet.has(id)) {
					idSet.delete(id);
					ids.push(id);
				}
			});
			res.mappings[tier.key] = { ids };
		} else {
			res.mappings[tier.key] = {
				ids: [],
			};
		}
	}
	// uncategorized
	res.mappings[uncategorizedTier.key] = {
		ids: [...idSet.values()],
	};
	return res;
};

const tierDataQuery = selectorFamily<TierData, TierKey>({
	key: "tierData",
	get: (key) => async () => {
		return await getTierData(key);
	},
});

const tierMappingEffect: (key: TierKey) => AtomEffect<TierMapping> =
	(key) => ({ setSelf, onSet, getPromise }) => {
		const itemKey = `tiers/${key}`;
		const savedValue = localStorage.getItem(itemKey);
		if (savedValue != null) {
			setSelf(
				getPromise(tierDataQuery(key)).then((data) =>
					normalizeMapping(data, JSON.parse(savedValue)),
				),
			);
		} else {
			setSelf(
				getPromise(tierDataQuery(key)).then((data) =>
					normalizeMapping(data, undefined),
				),
			);
		}
		onSet((newValue, _, isReset) => {
			if (isReset) {
				localStorage.removeItem(itemKey);
			} else {
				localStorage.setItem(itemKey, JSON.stringify(newValue));
			}
		});
	};

export type TierMapping = {
	mappings: Record<TierKey, { ids: string[] }>;
};

const tierMappingStore = atomFamily<TierMapping, TierKey>({
	key: "tierMappingState",
	default: { mappings: {} },
	effects: (key) => [tierMappingEffect(key)],
});

export const useTierMapping = (key: TierKey) => {
	return useRecoilValue(tierMappingStore(key));
};

export const useSetTierMapping = (key: TierKey) => {
	return useSetRecoilState(tierMappingStore(key));
};

export const useTierData = (key: string) => {
	return useRecoilValue(tierDataQuery(key));
};

export const swapOrder = <T>(items: T[], active: number, over: number): T[] => {
	const item = items[active];
	if (!item) {
		return items;
	}
	const filtered = items.filter((_, index) => index !== active);
	return [...filtered.slice(0, over), item, ...filtered.slice(over)];
};

export const charactersDataQuery = selectorFamily<CharactersInfo, number>({
	key: "charactersInfo",
	get: (key) => async () => {
		return await getCharacterInfo(key);
	},
});

export const useCharactersInfo = (key: number) => {
	return useRecoilValue(charactersDataQuery(key));
};

const characterTierMappingEffect: (
	key: CharacterInfoKey,
) => AtomEffect<TierMapping> = (key) => ({ setSelf, onSet }) => {
	const itemKey = `c/${key.id}`;
	const savedValue = localStorage.getItem(itemKey);
	if (savedValue != null) {
		setSelf(
			normalizeMapping(
				{
					images: key.images,
					definition: { query: { season: null, seasonYear: 0 }, title: "" },
				},
				JSON.parse(savedValue),
			),
		);
	} else {
		setSelf(
			normalizeMapping(
				{
					images: key.images,
					definition: { query: { season: null, seasonYear: 0 }, title: "" },
				},
				undefined,
			),
		);
	}
	onSet((newValue, _, isReset) => {
		if (isReset) {
			localStorage.removeItem(itemKey);
		} else {
			localStorage.setItem(itemKey, JSON.stringify(newValue));
		}
	});
};

type CharacterInfoKey = {
	id: number;
	images: Record<string, string>;
};

const characterTierMappingStore = atomFamily<TierMapping, CharacterInfoKey>({
	key: "characterTierMappingState",
	default: { mappings: {} },
	effects: (key) => [characterTierMappingEffect(key)],
});

export const useCharacterTierMapping = (key: CharacterInfoKey) => {
	return useRecoilValue(characterTierMappingStore(key));
};

export const useSetCharacterTierMapping = (key: CharacterInfoKey) => {
	return useSetRecoilState(characterTierMappingStore(key));
};
