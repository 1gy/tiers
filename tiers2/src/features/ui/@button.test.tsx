import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { Button } from "./@button";

it("should render", () => {
	const { container } = render(
		<Button className="test" onClick={() => {}}>
			Content
		</Button>,
	);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<button
		  class="text_app.primary p_6px_8px fw_medium fs_sm transition_background-color_0.2s_ease-in-out [&:hover]:bg_rgba(25,_118,_210,_0.04) test"
		  type="button"
		>
		  Content
		</button>
	`);
});
