import { FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { iconSize } from "./constants";
import { MuiBox } from "../../components/presentational/Mui";

export type TierCardProps = {
	image: string;
};

export const TierCard: FC<TierCardProps> = memo(({ image }) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: image,
	});
	const style = {
		transform: CSS.Transform.toString(transform),
	};

	return (
		<MuiBox
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			display="inline-block"
			sx={{ touchAction: "none" }}
		>
			<img
				src={image}
				alt=""
				width={iconSize}
				height={iconSize}
				style={{ verticalAlign: "top" }}
			/>
		</MuiBox>
	);
});
TierCard.displayName = "TierCard";
