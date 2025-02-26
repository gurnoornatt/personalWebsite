import { Hono } from "hono";

import { postService } from "@/modules/posts";
import { zValidator } from "@/pkg/util/validator-wrapper";
import { postInsertSchema } from "@repo/db";

const postRoutes = new Hono()
  .get("/", async (c) => {
    const posts = await postService.getPosts();
    return c.json(posts);
  })
  // Anyone can create posts (no authentication required)
  .post("/", zValidator("json", postInsertSchema), async (c) => {
    const insertPost = c.req.valid("json");
    // Use a default or anonymous user ID
    const userId = "anonymous";

    const newPost = await postService.createPost({ ...insertPost, userId });
    return c.json(newPost);
  });

export { postRoutes };
