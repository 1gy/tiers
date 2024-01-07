const anilistApiUrl = "https://graphql.anilist.co";

const animeInfoQuery = `
query ($id: Int) {
    Media(id: $id) {
        title {
            native
        }
        coverImage {
            large
        }
        externalLinks {
            url
            icon
            language
            site
        }
    }
}`;

type AnimeInfoQueryResponse = {
	data: {
		Media: {
			title: {
				native: string;
			};
			coverImage: {
				large: string;
			};
			externalLinks: {
				url: string;
				icon: string;
				language: string;
				site: string;
			}[];
		};
	};
};

export type AnimeInfo = {
	title: string;
	coverImage: string;
	externalLinks: {
		url: string;
		icon: string;
		site: string;
	}[];
};

export const getAnimeInfo = async (id: number): Promise<AnimeInfo> => {
	const response = await fetch(anilistApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: animeInfoQuery,
			variables: { id },
		}),
	});
	const json = (await response.json()) as AnimeInfoQueryResponse;
	return {
		title: json.data.Media.title.native,
		coverImage: json.data.Media.coverImage.large,
		externalLinks: json.data.Media.externalLinks
			.filter((link) => link.language === "Japanese")
			.map((link) => ({
				url: link.url,
				icon: link.icon,
				site: link.site,
			})),
	};
};
