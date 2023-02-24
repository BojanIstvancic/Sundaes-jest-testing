import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases done in order", async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);
  // add ice cream scoops and toppings - OrderEntry
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  // find and click button order button
  const orderSundaeButton = screen.getByRole("button", {
    name: "Order Sundae",
  });
  await user.click(orderSundaeButton);

  // check summary information based on order - OrderSummary
  const scoopsTotal = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("4.00");

  const toppingsTotal = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  // accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox");
  await user.click(termsCheckbox);

  // confirm order number on confirmation page
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // click new order button on - Order Confirmation
  const confirmationButton = await screen.findByRole("button", {
    name: "Create New Order",
  });
  await user.click(confirmationButton);
  // check that scoops and toppings subtotals have been reset - OrderEntry
  const scoopsTotalOrderSummary = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsTotalOrderSummary).toHaveTextContent("0.00");

  const toppingsTotalOrderSummary = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotalOrderSummary).toHaveTextContent("0.00");

  unmount();
});

test("order confirmation, loading shows while data is loading", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Order Page
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const orderSundaeButton = screen.getByRole("button", {
    name: "Order Sundae",
  });
  await user.click(orderSundaeButton);

  // Summary Page
  const termsCheckbox = screen.getByRole("checkbox");
  await user.click(termsCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Confirmation Page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const HeadingText = await screen.findByText("Thank you");
  expect(HeadingText).toBeInTheDocument();

  const notLoading = screen.queryByText("Loading");
  expect(notLoading).not.toBeInTheDocument();
});

test("toppings list and heading are not visible if no toppings are selected", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Order Page
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const orderSundaeButton = screen.getByRole("button", {
    name: "Order Sundae",
  });
  await user.click(orderSundaeButton);

  const toppingsTotal = screen.queryByText("Toppings: $", { exact: false });
  expect(toppingsTotal).not.toBeInTheDocument();
});
