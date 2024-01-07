import { assetsUrl } from "../libs/constants";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

export type TierDefinition = {
	readonly key: TierKey;
	readonly label: string;
	readonly color: string;
};

export type TierTableDefinition = {
	readonly title: string;
	readonly images: string[];
	readonly tiers: TierDefinition[];
};

export const getTierData = async (key: string): Promise<TierData> => {
	const data = await import(`../assets/${key}.json`);
	return data.default;
};

export const getTierTableDefinition = async (
	defKey: string,
): Promise<TierTableDefinition> => {
	await delay(1);
	const url = `${assetsUrl}/${defKey}/def.json`;
	const res = await fetch(url);
	if (res.status !== 200) {
		throw new Error(`failed to fetch "${url}"`);
	}
	const definition = (await res.json()) as TierTableDefinition;
	const mapped: TierTableDefinition = {
		...definition,
		images: definition.images.map((name) => getTierAssetUrl(defKey, name)),
	};
	return mapped;
};

export const getTierAssetUrl = (defKey: string, name: string) => {
	const url = `${assetsUrl}/${defKey}/${name}`;
	return url;
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
