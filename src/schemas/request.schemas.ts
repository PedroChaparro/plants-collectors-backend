import { z } from "zod";

export const signupRequestSchema = z.object({
  username: z.string().min(4).max(16),
  email: z.string().email(),
  password: z.string().min(8),
});
