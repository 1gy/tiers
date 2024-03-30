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
	id: number;
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
		id,
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

const characterInfoQuery = `
query ($id: Int){
	Media(id: $id) {
	title {
		native
	}
	characters {
			nodes {
				id
				image {
					medium
				}
			}
		}
	}
}`;

type CharacterInfoQueryResponse = {
	data: {
		Media: {
			title: {
				native: string;
			};
			characters: {
				nodes: {
					id: number;
					image: {
						medium: string;
					};
				}[];
			};
		};
	};
};

export type CharactersInfo = {
	id: number;
	title: string;
	characters: {
		id: number;
		image: string;
	}[];
};

export const getCharacterInfo = async (id: number): Promise<CharactersInfo> => {
	const response = await fetch(anilistApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: characterInfoQuery,
			variables: { id },
		}),
	});
	const json = (await response.json()) as CharacterInfoQueryResponse;
	return {
		id,
		title: json.data.Media.title.native,
		characters: json.data.Media.characters.nodes.map((node) => ({
			id: node.id,
			image: node.image.medium,
		})),
	};
};
