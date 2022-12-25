import {
	AtomEffect,
	atomFamily,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import {
	getTierTableDefinition,
	TierDefinition,
	TierTableDefinition,
} from "../../apis/tiers";

type TierKey = string;

export const uncategorizedTier: TierDefinition = {
	key: "uncategorized",
	color: "gray",
	label: "",
};

const createDefaultMapping = (
	definition: TierTableDefinition | null,
): TierMapping => {
	const mapping: TierMapping = { mappings: {} };
	if (!definition) {
		return mapping;
	}
	definition.tiers.map((tier) => {
		mapping.mappings[tier.key] = { images: [] };
	});
	mapping.mappings[uncategorizedTier.key] = { images: definition.images };
	return mapping;
};

const tierMappingEffect: (key: TierKey) => AtomEffect<TierMapping> =
	(key) => ({ setSelf, onSet, getPromise }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		} else {
			setSelf(
				getPromise(currentTierQuery(key)).then((def) =>
					createDefaultMapping(def),
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

export const currentTierQuery = selectorFamily<
	TierTableDefinition | null,
	TierKey
>({
	key: "currentTier",
	get: (key) => async () => {
		if (key == null) {
			return null;
		}
		try {
			return await getTierTableDefinition(key);
		} catch (_) {
			return null;
		}
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
	const definition = useRecoilValue(currentTierQuery(key));
	return {
		definition,
	};
};
