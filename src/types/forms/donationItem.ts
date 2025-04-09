import { z } from 'zod';
import { zItemResponse } from '../items';

export const zDonationItemFormData = z.object({
  itemRes: zItemResponse,
  category: z.string().trim().min(1, { message: 'Required' }),
  name: z.string().trim().min(1, { message: 'Required' }),
  quantity: z.number().positive().min(1, { message: 'Required' }),
  barcode: z.string().trim(),
  newOrUsed: z.string().trim().min(1, { message: 'Required' }),
  highOrLow: z.string().trim().optional(),
  price: z.number().positive().min(1, { message: 'Required' }),
});

export interface DonationItemFormData
  extends z.infer<typeof zDonationItemFormData> {}
