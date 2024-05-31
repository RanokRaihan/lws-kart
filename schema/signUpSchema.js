import { z } from "zod";

const RegisterSchema = z
  .object({
    name: z.string().nonempty({ message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    agreement: z.boolean().refine((value) => value === true, {
      message: "Please agree to the terms and conditions to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default RegisterSchema;
