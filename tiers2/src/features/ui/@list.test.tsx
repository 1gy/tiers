import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { List, ListItem, ListItemButton, ListItemText } from "./@list";

it("should render", () => {
	const { container } = render(
		<List className="test1">
			<ListItem className="test2">
				<ListItemButton className="test3">
					<ListItemText className="test4">Content</ListItemText>
				</ListItemButton>
			</ListItem>
		</List>,
	);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<ul
		  class="pt_2 pb_2 pl_0 pr_0 test1"
		>
		  <li
		    class="d_flex w_full test2"
		  >
		    <button
		      class="items_center box_border-box d_flex grow_1 justify_flex-start cursor_pointer select_none text_inherit v-align_middle text-align_left pt_2 pb_2 pl_4 pr_4 pos_relative transition_background-color_150ms_ease-out hover:bg_gray.100 test3"
		      type="button"
		    >
		      <div
		        class="flex_auto min-w_0 mt_1 mb_1 test4"
		      >
		        Content
		      </div>
		    </button>
		  </li>
		</ul>
	`);
});
