import { z } from 'zod';

export const zDonationFormData = z.object({
  donationDate: z.date(),
  category: z.string().min(1, { message: 'Required' }),
  donatedItemName: z.string().min(1, { message: 'Required' }),
  quantity: z.number().positive().min(1, { message: 'Required' }),
  newOrUsed: z.string().min(1, { message: 'Required' }),
  price: z.number().positive().min(1, { message: 'Required' }),
  user: z.string().min(1, { message: 'Required' }),
});

export interface DonationFormData extends z.infer<typeof zDonationFormData> {}
