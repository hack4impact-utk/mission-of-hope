import { z } from 'zod';
import { zItemResponse } from '../items';

export const zDonationItemFormData = z.object({
  itemRes: zItemResponse,
  category: z.string().min(1, { message: 'Required' }),
  name: z.string().min(1, { message: 'Required' }),
  quantity: z.number().positive().min(1, { message: 'Required' }),
  newOrUsed: z.string().min(1, { message: 'Required' }),
  highOrLow: z.string().optional(),
  price: z.number().positive().min(1, { message: 'Required' }),
});

export interface DonationItemFormData
  extends z.infer<typeof zDonationItemFormData> {}
