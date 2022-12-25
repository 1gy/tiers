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
	id: "uncategorized",
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
		mapping.mappings[tier.id] = { images: [] };
	});
	mapping.mappings[uncategorizedTier.id] = { images: definition.images };
	return mapping;
};

const tierMappingEffect: (id: TierKey) => AtomEffect<TierMapping> =
	(id) => ({ setSelf, onSet, getPromise }) => {
		const savedValue = localStorage.getItem(id);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		} else {
			setSelf(
				getPromise(currentTierQuery(id)).then((def) =>
					createDefaultMapping(def),
				),
			);
		}
		onSet((newValue, _, isReset) => {
			if (isReset) {
				localStorage.removeItem(id);
			} else {
				localStorage.setItem(id, JSON.stringify(newValue));
			}
		});
	};

export const currentTierQuery = selectorFamily<
	TierTableDefinition | null,
	TierKey
>({
	key: "currentTier",
	get: (id) => async () => {
		if (id == null) {
			return null;
		}
		try {
			return await getTierTableDefinition(id);
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
	effects: (id) => [tierMappingEffect(id)],
});

export const useTierMapping = (id: TierKey) => {
	return useRecoilValue(tierMappingStore(id));
};

export const useSetTierMapping = (id: TierKey) => {
	return useSetRecoilState(tierMappingStore(id));
};

export type TierTable = {
	tier: TierDefinition;
	images: string[];
}[];

export const useTierDefinition = (id: string) => {
	const definition = useRecoilValue(currentTierQuery(id));
	return {
		definition,
	};
};
