import { assetsUrl } from "../libs/constants";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type TierKey = string;

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
