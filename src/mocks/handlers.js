import { rest } from "msw";

// Mock server response using Mock Service Worker - setup handlers

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images.chocolage.png" },
        { name: "Vanilla", imagePath: "/images.vanilla.png" },
      ])
    );
  }),
];
