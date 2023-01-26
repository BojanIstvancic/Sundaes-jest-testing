import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

/*
//  command[ALL]ByQueryType

  COMMANDS
 - get: expect element to be in DOM
 - query: expect element not to be in DOM
 - find: expect element to appear async

 [ALL]
 - (exclude) - expects one match
 - (include) - expects more than one match

 QueryType
 - Role
 - AltText
 - Text
 - Form
    - PlaceholderText
    - LabelText
    - DisplayValue
*/

test("initial setup", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("check if button is enabled on first click and disabled on second", async () => {
  const user = userEvent.setup();
  // we must always start the sesion to simulate userEvents
  // also they are always returning a PROMISE so we must await the response

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
