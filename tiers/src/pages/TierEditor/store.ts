import { useEffect } from "react";
import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import {
	getTierTableDefinition,
	TierDefinition,
	TierTableDefinition,
} from "../../apis/tiers";

export const currentTierQuery = selectorFamily<
	TierTableDefinition | null,
	string
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

const tierMappingStore = atom<TierMapping[]>({
	key: "tierMappingState",
	default: [],
});

export const useTierMapping = () => {
	return useRecoilValue(tierMappingStore);
};

export const useSetTierMapping = () => {
	return useSetRecoilState(tierMappingStore);
};

export type TierTable = {
	tier: TierDefinition;
	images: string[];
}[];

export const useTierDefinition = (id: string) => {
	const definition = useRecoilValue(currentTierQuery(id));
	const setTierMapping = useSetRecoilState(tierMappingStore);

	useEffect(() => {
		if (definition) {
			setTierMapping(() => {
				const mapping: TierMapping[] = [];
				definition.tiers.map((tier) => mapping.push({ tier, images: [] }));
				mapping.push({
					tier: { id: "uncategorized", label: "", color: "gray" },
					images: definition.images,
				});
				return mapping;
			});
		}
	}, [definition]);

	return {
		definition,
	};
};
