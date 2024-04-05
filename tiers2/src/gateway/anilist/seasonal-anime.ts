import { anilistApiUrl } from "./constants";

const seasonalAnimeImagesQuery = `
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

type SeasonalAnimeImagesQueryVariables = {
	page: number;
	seasonYear: number;
	season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
};

type SeasonalAnimeImagesQueryResponse = {
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

export const getSeasonalAnimeImages = async (
	seasonYear: number,
	season: "WINTER" | "SPRING" | "SUMMER" | "FALL",
): Promise<{ [id: string]: string }> => {
	const images: { [id: string]: string } = {};

	let page = 1;
	let hasNextPage = true;
	while (hasNextPage) {
		const variables: SeasonalAnimeImagesQueryVariables = {
			page,
			seasonYear,
			season,
		};
		const response = await fetch(anilistApiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: seasonalAnimeImagesQuery, variables }),
		}).then((res) => res.json() as Promise<SeasonalAnimeImagesQueryResponse>);

		hasNextPage = response.data.Page.pageInfo.hasNextPage;
		page++;

		for (const anime of response.data.Page.media) {
			images[anime.id.toString()] = anime.coverImage.medium;
		}
	}
	return images;
};

if (import.meta.vitest) {
	const { it, expect, describe, afterEach, vi } = import.meta.vitest;

	const createResponse = <T>(data: T) => new Response(JSON.stringify(data));

	describe.concurrent("anilist", () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it("should fetch seasonal anime images", async () => {
			vi.spyOn(global, "fetch")
				.mockImplementationOnce(async () =>
					createResponse<SeasonalAnimeImagesQueryResponse>({
						data: {
							Page: {
								pageInfo: {
									hasNextPage: true,
								},
								media: [
									{
										id: 1,
										coverImage: {
											medium: "image1.jpg",
										},
									},
									{
										id: 2,
										coverImage: {
											medium: "image2.jpg",
										},
									},
								],
							},
						},
					}),
				)
				.mockImplementationOnce(async () =>
					createResponse<SeasonalAnimeImagesQueryResponse>({
						data: {
							Page: {
								pageInfo: {
									hasNextPage: false,
								},
								media: [
									{
										id: 10,
										coverImage: {
											medium: "image10.jpg",
										},
									},
									{
										id: 11,
										coverImage: {
											medium: "image11.jpg",
										},
									},
								],
							},
						},
					}),
				)
				.mockImplementation(() => {
					throw new Error("unexpected fetch call");
				});

			const images = await getSeasonalAnimeImages(2024, "SPRING");
			expect(images).toEqual({
				"1": "image1.jpg",
				"2": "image2.jpg",
				"10": "image10.jpg",
				"11": "image11.jpg",
			});
		});
	});
}
