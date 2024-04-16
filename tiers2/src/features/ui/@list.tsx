import { css, cx } from "@styled-system/css";
import type { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";

export type ListProps = {
	children?: ComponentChildren;
	className?: string;
};

export const List = forwardRef<HTMLUListElement, ListProps>(
	({ children, className }, ref) => {
		return (
			<ul
				ref={ref}
				className={cx(css({ pt: "2", pb: "2", pl: "0", pr: "0" }), className)}
			>
				{children}
			</ul>
		);
	},
);
List.displayName = "List";

export type ListItemProps = {
	children?: ComponentChildren;
	className?: string;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
	({ children, className }, ref) => {
		return (
			<li
				ref={ref}
				className={cx(
					css({
						display: "flex",
						w: "full",
					}),
					className,
				)}
			>
				{children}
			</li>
		);
	},
);
ListItem.displayName = "ListItem";

export type ListItemButtonProps = {
	children?: ComponentChildren;
	className?: string;
	onClick?: () => void;
};

export const ListItemButton = forwardRef<
	HTMLButtonElement,
	ListItemButtonProps
>(({ children, className, onClick }, ref) => {
	return (
		<button
			ref={ref}
			type="button"
			className={cx(
				css({
					alignItems: "center",
					boxSizing: "border-box",
					display: "flex",
					flexGrow: "1",
					justifyContent: "flex-start",
					cursor: "pointer",
					userSelect: "none",
					color: "inherit",
					verticalAlign: "middle",
					textAlign: "left",
					pt: "2",
					pb: "2",
					pl: "4",
					pr: "4",
					position: "relative",
					transition: "background-color 150ms ease-out",
					_hover: {
						bg: "gray.100",
					},
				}),
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
});
ListItemButton.displayName = "ListItemButton";

export type ListItemTextProps = {
	children?: ComponentChildren;
	className?: string;
};

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
	({ children, className }, ref) => {
		return (
			<div
				ref={ref}
				className={cx(
					css({
						flex: "auto",
						minW: "0",
						mt: "1",
						mb: "1",
					}),
					className,
				)}
			>
				{children}
			</div>
		);
	},
);
ListItemText.displayName = "ListItemText";
