import { z } from 'zod';

export const updateCurrentUserSchema = z.object({
  name: z.string().optional(),
});

export type updateCurrentUserInput = z.infer<typeof updateCurrentUserSchema>;
