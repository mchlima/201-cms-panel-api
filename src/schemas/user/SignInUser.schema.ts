import { z } from 'zod';

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signInUserInput = z.infer<typeof signInUserSchema>;
