import { z } from 'zod';

// Zip number and zip string are seperated to help with error checking and
// form validation
export const zDonorFormData = z.object({
  _id: z.string(),
  firstName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  email: z.string().email().min(1, { message: 'Required' }),
  address: z.string().min(1, { message: 'Required' }),
  city: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  zip: z.string().min(1, { message: 'Required' }),
});

export interface DonorFormData extends z.infer<typeof zDonorFormData> {}
