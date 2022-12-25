import type { FC } from "react";
import { useNavigate } from "rocon/react";
import {
	MuiBox,
	MuiList,
	MuiListItem,
	MuiListItemButton,
	MuiListItemText,
} from "../../components/presentational/Mui";
import { useTiers } from "./store";
import { editorRoutes } from "../Routes";

export const TierList: FC = () => {
	const tiers = useTiers();
	const navigate = useNavigate();

	return (
		<MuiBox>
			<MuiList>
				{tiers.defs.map((tier) => (
					<MuiListItem key={tier.key} disablePadding>
						<MuiListItemButton
							onClick={() =>
								navigate(editorRoutes.exactRoute, { id: tier.key })
							}
						>
							<MuiListItemText primary={tier.title} />
						</MuiListItemButton>
					</MuiListItem>
				))}
			</MuiList>
		</MuiBox>
	);
};
