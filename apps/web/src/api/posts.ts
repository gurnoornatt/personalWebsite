import { getApiClient } from "./client";

export async function getPosts() {
  const client = await getApiClient();

  const response = await client.posts.$get();
  return response.json();
}

// export async function createPost(post: Post) {
//   const client = await getApiClient();

//   const response = await client.posts.$post(post);
//   return response.json();
// }
