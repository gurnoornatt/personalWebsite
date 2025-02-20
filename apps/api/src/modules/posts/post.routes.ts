import { Hono } from "hono";

import { auth } from "@/pkg/middleware/clerk-auth";
import { postService } from "@/modules/posts";

const postRoutes = new Hono()
  .use(auth())
  .get("/", async (c) => {
    const posts = await postService.getPosts();
    return c.json(posts);
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const newPost = await postService.createPost(body);
    return c.json(newPost);
  });

export { postRoutes };
