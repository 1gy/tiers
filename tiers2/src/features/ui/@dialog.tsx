import { css, cx } from "@styled-system/css";
import type { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";

const Backdrop = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div
			ref={ref}
			className={css({
				bgColor: "rgba(0, 0, 0, 0.5)",
				position: "fixed",
				top: "0",
				left: "0",
				bottom: "0",
				right: "0",
				zIndex: "-1",
			})}
			aria-hidden="true"
		/>
	);
});
Backdrop.displayName = "Backdrop";

type DialogTitleProps = {
	children: ComponentChildren;
	className?: string;
};

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
	({ children, className }, ref) => {
		return (
			<h6
				ref={ref}
				className={cx(
					css({
						pl: "4",
						pr: "4",
						pt: "6",
						pb: "6",
						fontSize: "xl",
						fontWeight: "medium",
					}),
					className,
				)}
			>
				{children}
			</h6>
		);
	},
);
DialogTitle.displayName = "DialogTitle";

type DialogActionsProps = {
	children: ComponentChildren;
	className?: string;
};

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
	({ children, className }, ref) => {
		return (
			<div
				ref={ref}
				className={cx(
					css({
						display: "flex",
						justifyContent: "flex-end",
						padding: "2",
					}),
					className,
				)}
			>
				{children}
			</div>
		);
	},
);
DialogActions.displayName = "DialogActions";

type DialogContentProps = {
	children: ComponentChildren;
	className?: string;
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
	({ children, className }, ref) => {
		return (
			<div
				ref={ref}
				className={cx(
					css({
						pl: "6",
						pr: "6",
						pt: "5",
						pb: "5",
					}),
					className,
				)}
			>
				{children}
			</div>
		);
	},
);
DialogContent.displayName = "DialogContent";

type DialogProps = {
	children: ComponentChildren;
	className?: string;
	open: boolean;
	onClose: () => void;
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	({ children, className, open }, ref) => {
		if (!open) return null;
		return (
			<div
				ref={ref}
				role="presentation"
				className={css({
					position: "fixed",
					top: "0",
					left: "0",
					bottom: "0",
					right: "0",
					zIndex: "1300",
				})}
			>
				<Backdrop />
				<div
					className={css({
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "full",
						height: "full",
					})}
				>
					<div
						className={cx(
							css({
								width: "600px",
								color: "black",
								bgColor: "white",
								borderRadius: "md",
								boxShadow: "lg",
							}),
							className,
						)}
						role="dialog"
					>
						{children}
					</div>
				</div>
			</div>
		);
	},
);
Dialog.displayName = "Dialog";
