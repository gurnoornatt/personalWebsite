import { Hono } from "hono";
import { postService } from "./post.service";
import { auth } from "@/pkg/middleware/clerk-auth";

const postRoutes = new Hono()
  .use(auth())
  .get("/", async (c) => {
    const posts = await postService.getPosts();
    return c.json({ message: "Hello, world!" });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const newPost = await postService.createPost(body);
    return c.json(newPost);
  });

export { postRoutes };
