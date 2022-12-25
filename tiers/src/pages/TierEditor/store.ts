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
	definition: TierTableDefinition,
	mapping: DeepNullable<TierMapping> | undefined,
) => {
	const imageSet = new Set<string>(definition.images);
	const res: TierMapping = { mappings: {} };
	for (const tier of definition.tiers) {
		if (mapping?.mappings?.[tier.key]?.images) {
			const images: string[] = [];
			mapping.mappings[tier.key]!.images?.forEach((img) => {
				if (!img) {
					return;
				}
				imageSet.delete(img);
				images.push(img);
			});
			res.mappings[tier.key] = { images };
		} else {
			res.mappings[tier.key] = {
				images: [],
			};
		}
	}
	// uncategorized
	res.mappings[uncategorizedTier.key] = {
		images: [...imageSet.values()],
	};
	return res;
};

const tierMappingEffect: (key: TierKey) => AtomEffect<TierMapping> =
	(key) => ({ setSelf, onSet, getPromise }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(
				getPromise(tierQuery(key)).then((def) =>
					normalizeMapping(def, JSON.parse(savedValue)),
				),
			);
		} else {
			setSelf(
				getPromise(tierQuery(key)).then((def) =>
					normalizeMapping(def, undefined),
				),
			);
		}
		onSet((newValue, _, isReset) => {
			if (isReset) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, JSON.stringify(newValue));
			}
		});
	};

const tierQuery = selectorFamily<TierTableDefinition, TierKey>({
	key: "currentTier",
	get: (key) => async () => {
		return await getTierTableDefinition(key);
	},
});

export type TierMapping = {
	mappings: Record<TierKey, { images: string[] }>;
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
