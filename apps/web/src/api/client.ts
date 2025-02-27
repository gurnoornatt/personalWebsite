import { hc } from "hono/client";
import { HTTPException } from "hono/http-exception";
import type { AppType } from "../../../api/src";

export type { InferRequestType, InferResponseType } from "hono/client";

const getBaseUrl = () => {
  // For Vercel, we can use relative URLs for API routes
  // This will automatically work for both local development and production
  return '';
};

export const apiRpc = hc<AppType>(getBaseUrl(), {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, init);
  },
}).api;

export const getApiClient = () => {
  return hc<AppType>(getBaseUrl(), {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);

      const response = await fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new HTTPException(response.status as any, {
          message: "Network response was not ok",
        });
      }

      return response;
    },
  }).api;
};

export const getServerClient = () => {
  return hc<AppType>(getBaseUrl(), {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      const response = await fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new HTTPException(response.status as any, {
          message: "Network response was not ok",
        });
      }

      return response;
    },
  }).api;
};
