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
