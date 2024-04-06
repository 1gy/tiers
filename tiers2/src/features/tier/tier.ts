export type TierKey = string;

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
