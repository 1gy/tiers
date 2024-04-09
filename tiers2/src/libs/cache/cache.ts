type Cache<T> = {
	data: T;
	updatedAt: number;
};

export const cached = async <T>(
	key: string,
	fn: () => Promise<T>,
	ttl = 1000 * 60 * 60 * 24,
): Promise<T> => {
	const now = Date.now();
	const storageKey = `tiers2/cache/${key}`;
	const cache = localStorage.getItem(storageKey);
	if (cache) {
		const { data, updatedAt } = JSON.parse(cache) as Cache<T>;
		if (now - updatedAt < ttl) {
			return Promise.resolve(data);
		}
	}
	const newCache = {
		data: await fn(),
		updatedAt: now,
	} satisfies Cache<T>;
	localStorage.setItem(storageKey, JSON.stringify(newCache));
	return newCache.data;
};
