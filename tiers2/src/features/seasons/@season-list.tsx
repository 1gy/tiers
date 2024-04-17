import type { FunctionComponent } from "preact";
import { List, ListItem, ListItemButton, ListItemText } from "../ui";

export const SeasonList: FunctionComponent = () => {
	return (
		<List>
			<ListItem>
				<ListItemButton>
					<ListItemText>Item 1</ListItemText>
				</ListItemButton>
			</ListItem>
			{[...Array(10).keys()].map((i) => (
				<ListItem key={i}>
					<ListItemButton>
						<ListItemText>Item {i + 2}</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
