import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { Page } from "./@page";

it("should render", () => {
	const { container } = render(
		<Page className="test" style={{ background: "black" }}>
			Content
		</Page>,
	);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<div
		  class="w_screen h_screen overflow_hidden test"
		  style="background: black;"
		>
		  Content
		</div>
	`);
});
