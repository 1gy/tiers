import { cva, cx } from "@styled-system/css";
import type { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";

export type IconButtonProps = {
	children?: ComponentChildren;
	className?: string;
	onClick?: () => void;
	color?: "inherit" | "primary";
};

const iconButtonStyle = cva({
	base: {
		alignItems: "center",
		boxSizing: "border-box",
		display: "flex",
		flexGrow: "0",
		flexShrink: "0",
		justifyContent: "center",
		cursor: "pointer",
		userSelect: "none",
		p: "2",
	},
	variants: {
		color: {
			inherit: {
				color: "inherit",
			},
			primary: {
				color: "app.primary",
			},
		},
	},
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, className, onClick, color = "inherit" }, ref) => {
		return (
			<button
				type="button"
				ref={ref}
				className={cx(iconButtonStyle({ color }), className)}
				onClick={onClick}
			>
				{children}
			</button>
		);
	},
);
IconButton.displayName = "IconButton";
