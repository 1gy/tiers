import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { Slider } from "./@slider";

it("should render", () => {
	const { container } = render(<Slider className="test" value={123} />);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<input
		  class="test"
		  max="100"
		  min="0"
		  step="1"
		  type="range"
		/>
	`);
});
