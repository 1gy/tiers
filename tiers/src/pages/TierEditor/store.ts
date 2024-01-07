import {
	AtomEffect,
	atomFamily,
	selector,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import {
	getTierTableDefinition,
	TierDefinition,
	TierTableDefinition,
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

const tierQuery = selectorFamily<TierTableDefinition, TierKey>({
	key: "currentTier",
	get: (key) => async () => {
		return await getTierTableDefinition(key);
	},
});

const tierDataQuery = selectorFamily<TierData, TierKey>({
	key: "tierData",
	get: (key) => async () => {
		return await getTierData(key);
	},
});

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

export type TierTable = {
	tier: TierDefinition;
	images: string[];
}[];

export const useTierDefinition = (key: string) => {
	return useRecoilValue(tierQuery(key));
};

export const useTierData = (key: string) => {
	return useRecoilValue(tierDataQuery(key));
};
