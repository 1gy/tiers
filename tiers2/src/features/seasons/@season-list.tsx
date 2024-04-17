import type { FunctionComponent } from "preact";
import { useLocation } from "wouter-preact";
import { List, ListItem, ListItemButton, ListItemText } from "../ui";

const items = [
	{ label: "2023年 冬アニメ", url: "/seasons/2023-WINTER" },
	{ label: "2023年 春アニメ", url: "/seasons/2023-SPRING" },
	{ label: "2023年 夏アニメ", url: "/seasons/2023-SUMMER" },
	{ label: "2023年 秋アニメ", url: "/seasons/2023-FALL" },
	{ label: "2024年 冬アニメ", url: "/seasons/2024-WINTER" },
	{ label: "2024年 春アニメ", url: "/seasons/2024-SPRING" },
];

export const SeasonList: FunctionComponent = () => {
	const [_, navigate] = useLocation();

	return (
		<List>
			{items.map((item) => (
				<ListItem key={item.url}>
					<ListItemButton onClick={() => navigate(item.url)}>
						<ListItemText>{item.label}</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
