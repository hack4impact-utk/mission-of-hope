import { z } from 'zod';

export const zItemFormData = z.object({
  _id: z.optional(z.string()),
  name: z.string().min(1, { message: 'Required' }),
  category: z.string().min(1, { message: 'Required' }),
  high: z.optional(z.number().positive().min(1, { message: 'Required' })),
  low: z.optional(z.number().positive().min(1, { message: 'Required' })),
  created: z.optional(z.boolean()),
});

export interface ItemFormData extends z.infer<typeof zItemFormData> {}
