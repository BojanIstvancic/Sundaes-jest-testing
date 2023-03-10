import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
// import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  // render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  // when component depends on context datta, means we need a provider, we can use { wrapper in render in order to provide the Provider}
  // this can be a router, redux provider, this can be any kind of a provider
  render(<Options optionType="scoops" />);
  // do the same with custom render

  // make total starts out at 0$
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  // partial match - amount of money will be updated

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1, and check subtotal
  // input type quantity / number
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  // clear the input
  await user.type(vanillaInput, "1");
  // type in the input

  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // 2$ per scoop

  // update chocolate scoops to 2, and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });

  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

test("update grand total depending on selected toppings and scoops", async () => {
  const user = userEvent.setup();

  render(<OrderEntry />);

  const grandTotal = screen.getByText("Grand total:", { exact: false });

  // test if starts at 0
  expect(grandTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.clear(vanillaInput);
  await user.clear(chocolateInput);

  await user.type(vanillaInput, "2");
  await user.type(chocolateInput, "3");

  await user.click(cherriesCheckbox);

  expect(grandTotal).toHaveTextContent("11.5");
});
