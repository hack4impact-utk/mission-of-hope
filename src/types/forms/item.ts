import { z } from 'zod';

export const zItemFormData = z.object({
  name: z.string().trim().min(1, { message: 'Required' }),
  category: z.string().trim().min(1, { message: 'Required' }),
  high: z.number().positive().min(1, { message: 'Required' }),
  low: z.number().positive().min(1, { message: 'Required' }),
  highString: z.string().trim().min(1, { message: 'Required' }),
  lowString: z.string().trim().min(1, { message: 'Required' }),
});

export interface ItemFormData extends z.infer<typeof zItemFormData> {}
