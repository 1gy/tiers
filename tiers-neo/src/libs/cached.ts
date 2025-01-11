const DEFAULT_TTL = 1000 * 60 * 60 * 24;

type Cache<T> = {
	data: T;
	updatedAt: number;
};

const cachedInternal =
	(now: () => number, getItem: (key: string) => string | null, setItem: (key: string, value: string) => void) =>
	async <T>(key: string, fn: () => Promise<T>, ttl = DEFAULT_TTL): Promise<T> => {
		const timestamp = now();
		const cachedData = getItem(key);
		if (cachedData) {
			const { data, updatedAt } = JSON.parse(cachedData) as Cache<T>;
			if (timestamp - updatedAt < ttl) {
				return data;
			}
		}
		const newData = {
			data: await fn(),
			updatedAt: timestamp,
		} satisfies Cache<T>;
		setItem(key, JSON.stringify(newData));
		return newData.data;
	};

export const cached = globalThis.localStorage
	? cachedInternal(Date.now, localStorage.getItem.bind(localStorage), localStorage.setItem.bind(localStorage))
	: () => {
			throw new Error("localStorage not available");
		};

if (import.meta.vitest) {
	const { it, expect, vi } = import.meta.vitest;
	it("works", async () => {
		const state = {
			storage: new Map<string, string>(),
			timestamp: 0,
			value: 42,
		};
		const cached = cachedInternal(
			() => state.timestamp,
			(key) => state.storage.get(key) ?? null,
			(key, value) => state.storage.set(key, value),
		);
		const calcFn = vi.fn(async () => state.value);

		expect(await cached("key", calcFn)).toBe(42);
		expect(calcFn).toBeCalledTimes(1);

		state.value = 57;
		expect(await cached("key", calcFn)).toBe(42);
		expect(calcFn).toBeCalledTimes(1);

		state.timestamp += DEFAULT_TTL;
		expect(await cached("key", calcFn)).toBe(57);
	});
}
