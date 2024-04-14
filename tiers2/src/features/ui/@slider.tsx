import { forwardRef } from "preact/compat";

export type SliderProps = {
	value: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
	({ value, onChange, min = 0, max = 100, step = 1, className }, ref) => (
		<input
			type="range"
			ref={ref}
			value={value}
			onInput={(e) => onChange?.((e.target as HTMLInputElement)?.valueAsNumber)}
			min={min}
			max={max}
			step={step}
			className={className}
		/>
	),
);
