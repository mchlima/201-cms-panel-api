import { z } from 'zod';

export const testSchema = z.object({
  numberOne: z.number().min(1),
  numberTwo: z.number().min(1),
});

export type testInput = z.infer<typeof testSchema>;
