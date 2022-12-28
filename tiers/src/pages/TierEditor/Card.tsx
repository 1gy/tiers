import { FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MuiBox } from "../../components/presentational/Mui";
import { useCardSize } from "../../hooks/uiSettings";

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
	const cardSize = useCardSize();

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
				width={cardSize}
				height={cardSize}
				style={{ verticalAlign: "top" }}
			/>
		</MuiBox>
	);
});
TierCard.displayName = "TierCard";
