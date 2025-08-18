import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
});

export type updateUserInput = z.infer<typeof updateUserSchema>;
