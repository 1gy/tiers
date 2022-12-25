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

type TierId = string;

const createDefaultMapping = (
	definition: TierTableDefinition | null,
): TierMapping[] => {
	const mapping: TierMapping[] = [];
	if (!definition) {
		return mapping;
	}
	definition.tiers.map((tier) => mapping.push({ tier, images: [] }));
	mapping.push({
		tier: { id: "uncategorized", label: "", color: "gray" },
		images: definition.images,
	});
	return mapping;
};

const tierMappingEffect: (id: TierId) => AtomEffect<TierMapping[]> =
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
	TierId
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
	tier: TierDefinition;
	images: string[];
};

const tierMappingStore = atomFamily<TierMapping[], TierId>({
	key: "tierMappingState",
	default: [],
	effects: (id) => [tierMappingEffect(id)],
});

export const useTierMapping = (id: TierId) => {
	return useRecoilValue(tierMappingStore(id));
};

export const useSetTierMapping = (id: TierId) => {
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
