import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, { message: "Username must be at least 2 characters" })
  .max(20, { message: "Username must be not more than 20 characters" });
// .regex(/^[^a-zA-Z0-9]+$/, {
//   message: "Username must not contain Special characters",
// });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});
