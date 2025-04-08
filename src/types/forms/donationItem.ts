import { z } from 'zod';
import { evaluationEnum } from '../donation';
import { zItemFormData } from './item';

export const zDonationItemFormData = z.object({
  item: z.optional(zItemFormData),
  quantity: z.number().positive().min(1, { message: 'Required' }),
  barcode: z.string(),
  newOrUsed: z.string().min(1, { message: 'Required' }),
  highOrLow: z.string().optional(),
  value: z.object({
    price: z.number().positive().min(1, { message: 'Required' }),
    evaluation: z.enum(evaluationEnum),
  }),
});

export interface DonationItemFormData
  extends z.infer<typeof zDonationItemFormData> {}
