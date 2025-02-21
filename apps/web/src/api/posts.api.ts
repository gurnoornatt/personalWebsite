import { apiRpc, getApiClient, InferRequestType } from "./client";

const $createPost = apiRpc.posts.$post;

export async function getPosts() {
  const client = await getApiClient();

  const response = await client.posts.$get();
  return response.json();
}

export async function createPost(params: InferRequestType<typeof $createPost>["json"]) {
  const client = await getApiClient();

  const response = await client.posts.$post({ json: params });
  return response.json();
}
