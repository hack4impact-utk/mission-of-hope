import { z } from 'zod';

export const zDonationFormData = z.object({
  donorFirstName: z.string().min(1, { message: 'Required' }),
  donorLastName: z.string().min(1, { message: 'Required' }),
  donorEmail: z.string().email().min(1, { message: 'Required' }),
  donorAddress: z.string().min(1, { message: 'Required' }),
  donorCity: z.string().min(1, { message: 'Required' }),
  donorState: z.string().min(1, { message: 'Required' }),
  donorzip: z.number().positive().min(1, { message: 'Required' }),
  donationDate: z.date(),
  category: z.string().min(1, { message: 'Required' }),
  donatedItemName: z.string().min(1, { message: 'Required' }),
  quantity: z.number().positive().min(1, { message: 'Required' }),
  newOrUsed: z.string().min(1, { message: 'Required' }),
  highOrLow: z.string().min(1, { message: 'Required' }),
  price: z.number().positive().min(1, { message: 'Required' }),
  user: z.string().min(1, { message: 'Required' }),
  prevDonated: z.boolean(),
});

export interface DonationFormData extends z.infer<typeof zDonationFormData> {}
