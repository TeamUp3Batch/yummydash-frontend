import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});


export { loginSchema };