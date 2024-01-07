import { FC, forwardRef, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCardSize } from "../../hooks/uiSettings";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { cva } from "../../../styled-system/css";

export type DraggableCardProps = {
	id: string;
	image: string;
	onClick?: (() => void) | undefined;
};

export const DraggableCard: FC<DraggableCardProps> = memo(
	({ image, id, onClick }) => {
		const { attributes, listeners, setNodeRef, transform, isDragging } =
			useSortable({
				id,
			});
		const style: React.CSSProperties = {
			transform: CSS.Transform.toString(transform),
			opacity: isDragging ? 0.5 : 1.0,
		};
		return (
			<Card
				ref={setNodeRef}
				style={style}
				attributes={attributes}
				listeners={listeners}
				image={image}
				onClick={onClick}
			/>
		);
	},
);
DraggableCard.displayName = "DraggableCard";

export type CardProps = {
	image: string;
	attributes?: DraggableAttributes | undefined;
	listeners?: SyntheticListenerMap | undefined;
	style?: React.CSSProperties | undefined;
	overlay?: boolean;
	onClick?: (() => void) | undefined;
};

const cardStyle = cva({
	base: {
		display: "inline-block",
		verticalAlign: "top",
		touchAction: "none",
		boxShadow: "",
		objectFit: "fill",
	},
	variants: {
		overlay: {
			true: {
				boxShadow: "0px 0px 12px 4px rgba(0, 0, 0, 0.5)",
			},
		},
	},
});

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ image, attributes, listeners, style, overlay, onClick }, ref) => {
		const cardSize = useCardSize();
		return (
			<div
				ref={ref}
				style={{ ...style }}
				onClick={onClick}
				{...attributes}
				{...listeners}
				className={cardStyle({ overlay: !!overlay })}
			>
				<img
					src={image}
					alt=""
					style={{
						width: `${cardSize}px`,
						height: `${cardSize}px`,
					}}
				/>
			</div>
		);
	},
);
Card.displayName = "Card";
