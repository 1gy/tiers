import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { Appbar } from "./@appbar";

it("should render", () => {
	const { container } = render(<Appbar>Title</Appbar>);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<header
		  class="bg_app.primary text_white d_flex"
		>
		  <div
		    class="min-h_12 d_flex items_center pl_4 w_full"
		  >
		    Title
		  </div>
		</header>
	`);
});
