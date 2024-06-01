import { z } from "zod";
export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .optional(),
  image: z.instanceof(File).optional(),
  dob: z.string().optional(),
});
