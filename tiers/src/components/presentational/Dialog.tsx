import { forwardRef, type ReactNode } from "react";
import { Typography } from "./Typography";
import { css, cx } from "../../../styled-system/css";

type DialogTitleProps = {
	children: ReactNode;
	className?: string;
};

const dialogTitle = css({
	pl: "4",
	pr: "4",
	pt: "6",
	pb: "6",
});

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
	({ children, className }, ref) => {
		return (
			<Typography ref={ref} className={cx(dialogTitle, className)} variant="h6">
				{children}
			</Typography>
		);
	},
);

type DialogActionsProps = {
	children: ReactNode;
	className?: string;
};

const dialogActions = css({
	display: "flex",
	justifyContent: "flex-end",
	padding: "2",
});

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
	({ children, className }, ref) => {
		return (
			<div ref={ref} className={cx(dialogActions, className)}>
				{children}
			</div>
		);
	},
);

type DialogContentProps = {
	children: ReactNode;
	className?: string;
};

const dialogContent = css({
	pl: "6",
	pr: "6",
	pt: "5",
	pb: "5",
});

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
	({ children, className }, ref) => {
		return (
			<div ref={ref} className={cx(dialogContent, className)}>
				{children}
			</div>
		);
	},
);

type DialogProps = {
	children: ReactNode;
	className?: string;
	open: boolean;
	onClose: () => void;
};

const dialog = {
	presentation: css({
		position: "fixed",
		top: "0",
		left: "0",
		bottom: "0",
		right: "0",
		zIndex: "1300",
	}),
	backdrop: css({
		bgColor: "rgba(0, 0, 0, 0.5)",
		position: "fixed",
		top: "0",
		left: "0",
		bottom: "0",
		right: "0",
		zIndex: "-1",
	}),
	container: css({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "full",
		height: "full",
	}),
	paper: css({
		width: "600px",
		color: "black",
		bgColor: "white",
		borderRadius: "md",
		boxShadow: "lg",
	}),
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	({ children, className, open }, ref) => {
		if (!open) return null;
		return (
			<div ref={ref} role="presentation" className={dialog.presentation}>
				<Backdrop />
				<div className={dialog.container}>
					<div className={cx(dialog.paper, className)} role="dialog">
						{children}
					</div>
				</div>
			</div>
		);
	},
);

const Backdrop = forwardRef<HTMLDivElement, {}>((_, ref) => {
	return <div ref={ref} className={dialog.backdrop} aria-hidden="true" />;
});
