/* From https://clerk.com/docs/webhooks/sync-data */

import { Hono } from "hono";
import { logger } from "@repo/logs";

// Simple webhook routes without Clerk integration
const webhookRoutes = new Hono().post("/", async (c) => {
  logger.info("Webhook received, but Clerk integration has been removed");
  return c.json({ message: "Webhook functionality has been disabled" }, 200);
});

export { webhookRoutes };
