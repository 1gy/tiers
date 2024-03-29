import { SVGProps, forwardRef } from "react";
import { css, cx } from "../../../styled-system/css";

// https://github.com/tailwindlabs/heroicons/blob/master/LICENSE

export const SettingsIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
	(props, ref) => {
		return (
			<svg
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="2.0"
				stroke="currentColor"
				{...props}
				className={cx(props.className, css({ w: "6", h: "6" }))}
			>
				<title>Settings</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
				/>
			</svg>
		);
	},
);
