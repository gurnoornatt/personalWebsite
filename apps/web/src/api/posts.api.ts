import { apiRpc, getServerClient, InferRequestType } from "./client";

const $createPost = apiRpc.posts.$post;

export async function getPosts() {
  // Use server client for all requests
  const serverClient = await getServerClient();
  const response = await serverClient.posts.$get();
  return response.json();
}

export type CreatePostParams = InferRequestType<typeof $createPost>["json"];
export async function createPost(params: CreatePostParams) {
  // Use server client for all requests
  const serverClient = await getServerClient();
  const response = await serverClient.posts.$post({ json: params });
  return response.json();
}
