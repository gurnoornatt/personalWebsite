import { postRoutes } from "@/modules/posts/post.route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/health", (c) => {
  return c.text("OK");
});

const routes = app.route("/posts", postRoutes);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

export type AppType = typeof routes;
