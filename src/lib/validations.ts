import * as z from "zod";

export const createPostSchema = z.object({
  description: z
    .string()
    .max(50, { message: "Description can't be too large" }),
});

export const editPostSchema = z.object({
  username: z.string(),
  profession: z.string(),
});
