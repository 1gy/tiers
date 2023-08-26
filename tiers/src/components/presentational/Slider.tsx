import { forwardRef } from "react";
import { css } from "../../../styled-system/css";

type SliderProps = {
	value: number;
	onChange: (event: Event, value: number | number[]) => void;
	min?: number;
	max?: number;
	step?: number;
};

const styles = css({
	base: {
		width: "full",
	},
});

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
	({ value, onChange, min = 0, max = 100, step = 1, ...props }, ref) => {
		return (
			<input
				type="range"
				ref={ref}
				value={value}
				onChange={(e) => onChange(e.nativeEvent, Number(e.target.value))}
				min={min}
				max={max}
				step={step}
				className={styles}
				{...props}
			/>
		);
	},
);
