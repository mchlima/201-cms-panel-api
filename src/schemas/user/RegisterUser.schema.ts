import { z } from 'zod';

export const registerUserSchema = z.object({
  tenant: z.object({
    name: z.string(),
    slug: z.string(),
    sellerId: z.string(),
  }),
  user: z.object({
    name: z.string(),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

export type registerUserInput = z.infer<typeof registerUserSchema>;
