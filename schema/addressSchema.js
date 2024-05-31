import { z } from "zod";

const addressFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 5 characters long"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits long"),
});

export default addressFormSchema;
