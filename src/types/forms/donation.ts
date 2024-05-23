import { z } from 'zod';

export const zDonationFormData = z.object({
  donationDate: z.coerce.date(),
  user: z.string().min(1, { message: 'Required' }),
  prevDonated: z.boolean(),
});

export interface DonationFormData extends z.infer<typeof zDonationFormData> {}
