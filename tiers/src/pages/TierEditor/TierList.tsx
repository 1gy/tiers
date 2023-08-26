import type { FC } from "react";
import { useNavigate } from "rocon/react";
import { useTiers } from "./store";
import { editorRoutes } from "../Routes";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "../../components/presentational/List";

export const TierList: FC = () => {
	const tiers = useTiers();
	const navigate = useNavigate();

	return (
		<List>
			{tiers.defs.map((tier) => (
				<ListItem key={tier.key}>
					<ListItemButton
						onClick={() => navigate(editorRoutes.exactRoute, { id: tier.key })}
					>
						<ListItemText>{tier.title}</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
