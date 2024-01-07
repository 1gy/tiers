export type TierKey = string;

export type Tiers = {
	defs: { key: TierKey; title: string }[];
};

export const getTiers = async (): Promise<Tiers> => {
	const tiers = (await import("../assets/list.json")).default as Record<
		string,
		{ title: string }
	>;
	return {
		defs: Object.entries(tiers).map(([id, def]) => ({
			key: id,
			title: def.title,
		})),
	};
};

export const getTierData = async (key: string): Promise<TierData> => {
	const data = await import(`../assets/${key}.json`);
	return data.default;
};

type AnilistQuery = {
	seasonYear: number;
	season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
};

type AnilistTierDefinition = {
	readonly title: string;
	readonly query: AnilistQuery;
};

export type TierData = {
	definition: AnilistTierDefinition;
	images: Record<string, string>;
};

export type TierDefinition = {
	readonly key: TierKey;
	readonly label: string;
	readonly color: string;
};

export const standardTiers: TierDefinition[] = [
	{ key: "S", label: "S", color: "#ff7f7f" },
	{ key: "A", label: "A", color: "#ffbf7f" },
	{ key: "B", label: "B", color: "#ffdf7f" },
	{ key: "C", label: "C", color: "#ffff7f" },
	{ key: "D", label: "D", color: "#bfff7f" },
	{ key: "E", label: "E", color: "#7fff7f" },
	{ key: "F", label: "F", color: "#7fffff" },
	{ key: "G", label: "G", color: "#7fbfff" },
];
