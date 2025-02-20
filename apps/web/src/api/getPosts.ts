import { getApiClient } from "./client";

export async function getPosts() {
  const response = await getApiClient().posts.$get();
  return response.json();
}
