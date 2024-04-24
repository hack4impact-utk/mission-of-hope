import { z } from 'zod';

export const zItemFormData = z.object({
  name: z.string().min(1, { message: 'Required' }),
  category: z.string().min(1, { message: 'Required' }),
  high: z.number().min(1, { message: 'Required' }),
  low: z.number().min(1, { message: 'Required' }),
});

export interface ItemFormData extends z.infer<typeof zItemFormData> {}
