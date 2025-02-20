import { Hono } from "hono";
import { cors } from "hono/cors";

import { postRoutes } from "@/modules/posts";
import { logger } from "hono/logger";
import { errorHandler } from "@/pkg/middleware/error";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/health", (c) => {
  return c.text("OK");
});

const routes = app.basePath("/api").use("*", errorHandler()).route("/posts", postRoutes);

export type AppType = typeof routes;

export default {
  port: 3004,
  fetch: app.fetch,
  idleTimeout: 30,
};
