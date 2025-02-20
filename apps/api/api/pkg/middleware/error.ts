import { logger } from "@repo/logs";
import type { Context, MiddlewareHandler } from "hono";

export const errorHandler: MiddlewareHandler = async (c: Context, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);

    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        error.name === "ValidationError" ? 400 : 500,
      );
    }

    return c.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      500,
    );
  }
};
