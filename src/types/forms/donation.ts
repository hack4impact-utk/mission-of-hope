import { z } from 'zod';

export const zDonationFormData = z.object({
  donationDate: z.date(),
  user: z.string().min(1, { message: 'Required' }),
});

export interface DonationFormData extends z.infer<typeof zDonationFormData> {}
