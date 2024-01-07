import { lstat, writeFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

type AnilistQuery = {
	seasonYear: number;
	season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
};

type AnilistTierDefinition = {
	readonly title: string;
	readonly query: AnilistQuery;
};

type TierData = {
	definition: AnilistTierDefinition;
	images: { [id: string]: string };
};

const getTiers = async () => {
	return (await import("../src/assets/list.json")).default as Record<
		string,
		AnilistTierDefinition
	>;
};

const anilistApiUrl = "https://graphql.anilist.co";

const seasonalAnimeQuery = `
query ($page: Int, $seasonYear: Int, $season: MediaSeason) {
	Page(page: $page, perPage: 50) {
		pageInfo {
			hasNextPage
		}
		media(type: ANIME, format_not_in: [MUSIC, MANGA, NOVEL, ONE_SHOT], isAdult: false, seasonYear: $seasonYear, season: $season) {
			id
			coverImage {
				medium
			}
		}
	}
}`;

type SeasonalAnimeQueryVariables = {
	page: number;
	seasonYear: number;
	season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
};

type SeasonalAnimeQueryResponse = {
	data: {
		Page: {
			pageInfo: {
				hasNextPage: boolean;
			};
			media: {
				id: number;
				coverImage: {
					medium: string;
				};
			}[];
		};
	};
};

const getSeasonalAnimeTierData = async (
	definition: AnilistTierDefinition,
): Promise<TierData> => {
	const { seasonYear, season } = definition.query;
	const images = new Map<string, string>();
	for (let page = 1; true; page++) {
		const res = await fetch(anilistApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: seasonalAnimeQuery,
				variables: {
					page,
					seasonYear,
					season,
				} satisfies SeasonalAnimeQueryVariables,
			}),
		});
		if (res.status !== 200) {
			throw new Error(`failed to fetch "${anilistApiUrl}"`);
		}
		const response = (await res.json()) as SeasonalAnimeQueryResponse;
		for (const media of response.data.Page.media) {
			images.set(media.id.toString(), media.coverImage.medium);
		}
		if (response.data.Page.pageInfo.hasNextPage === false) {
			break;
		}
	}
	return {
		definition,
		images: Object.fromEntries(images),
	};
};

const exists = async (path: string): Promise<boolean> => {
	try {
		return (await lstat(path)).isFile();
	} catch (e) {
		return false;
	}
};

const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
	const tiers = await getTiers();
	for (const [id, def] of Object.entries(tiers)) {
		const path = resolve(__dirname, `../src/assets/${id}.json`);
		if (!(await exists(path))) {
			const data = await getSeasonalAnimeTierData(def);
			const json = JSON.stringify(data);
			await writeFile(path, json, "utf-8");
		}
	}
};

main();
