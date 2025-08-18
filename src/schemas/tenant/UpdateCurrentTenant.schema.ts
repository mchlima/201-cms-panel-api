import { z } from 'zod';

export const updateCurrentTenantSchema = z.object({
  name: z.string().optional(),
});

export type updateCurrentTenantInput = z.infer<
  typeof updateCurrentTenantSchema
>;
