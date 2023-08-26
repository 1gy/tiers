import { forwardRef, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { Typography } from "./Typography";

type ListProps = {
	children: ReactNode;
	className?: string;
};

const listStyle = css({
	pt: "2",
	pb: "2",
	pl: "0",
	pr: "0",
});

export const List = forwardRef<HTMLUListElement, ListProps>(
	({ children, className }, ref) => {
		return (
			<ul ref={ref} className={cx(listStyle, className)}>
				{children}
			</ul>
		);
	},
);

type ListItemProps = {
	children: ReactNode;
	className?: string;
};

const listItemStyle = css({
	display: "flex",
	w: "full",
});

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
	({ children, className }, ref) => {
		return (
			<li ref={ref} className={cx(listItemStyle, className)}>
				{children}
			</li>
		);
	},
);

type ListItemButtonProps = {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
};

const listItemButtonStyle = css({
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
});

export const ListItemButton = forwardRef<
	HTMLButtonElement,
	ListItemButtonProps
>(({ children, className, onClick }, ref) => {
	return (
		<button
			type="button"
			ref={ref}
			className={cx(listItemButtonStyle, className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
});

type ListItemTextProps = {
	children: ReactNode;
	className?: string;
};

const listItemTextStyle = css({ flex: "auto", minW: "0", mt: "1", mb: "1" });

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
	({ children, className }, ref) => {
		return (
			<div ref={ref} className={cx(listItemTextStyle, className)}>
				<Typography variant="body1">{children}</Typography>
			</div>
		);
	},
);
