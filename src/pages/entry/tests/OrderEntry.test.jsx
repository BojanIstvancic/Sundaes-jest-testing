import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

import { rest } from "msw";
import { server } from "../../../mocks/server";

// Override handlers in order to test scenario when query fails
test("handles erroir for scoops and toppings routes", async () => {
  // reset handler, mimic server response "500"
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      res(ctx.status(500));
    }),

    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  // find - we expect alerts to appear when reaching catch block
  const alerts = await screen.findAllByRole("alert", {
    name: "An unexpected error ocurred. Please try again later.",
  });

  expect(alerts).toHaveLength(2);
});
