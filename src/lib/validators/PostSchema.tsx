import * as z from "zod";

export const PostSchema = z.object({
  body: z.string(),
  image: z.string().optional(),
});
