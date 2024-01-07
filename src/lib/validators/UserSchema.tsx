import * as z from "zod";

export const newUserSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().min(4, { message: "Email must be at least 4 characters" }),
  image: z.string().optional(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export const userSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .optional(),
  image: z.string().optional(),
  backgroundImage: z.string().optional(),
  bio: z.string().max(100, { message: "cannot be longer" }).optional(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .optional(),
});
