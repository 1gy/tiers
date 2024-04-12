import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { IconButton } from "./icon-button";

it("should render", () => {
	const { container } = render(
		<IconButton className="test" onClick={() => {}}>
			Content
		</IconButton>,
	);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<button
		  class="items_center box_border-box d_flex grow_0 shrink_0 justify_center cursor_pointer select_none p_2 text_inherit test"
		  type="button"
		>
		  Content
		</button>
	`);
});
