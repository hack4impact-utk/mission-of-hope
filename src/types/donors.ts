import zBase from './base';
import { z } from 'zod';

const zDonorBase = z.object({
  lastName: z.string().trim(),
  firstName: z.string().trim().optional(),
  email: z.string().trim(),
  address: z.string().trim(),
  city: z.string().trim(),
  state: z.string().trim(),
  zip: z.string().trim(),
});

export const zDonorEntity = zDonorBase.extend({ ...zBase.shape });

export const zCreateDonorRequest = zDonorBase;

export const zDonorResponse = zDonorEntity;

export const zUpdateDonorRequest = zCreateDonorRequest.partial();

export interface DonorEntity extends z.infer<typeof zDonorEntity> {}

export interface CreateDonorRequest
  extends z.infer<typeof zCreateDonorRequest> {}

export interface DonorResponse extends z.infer<typeof zDonorResponse> {}

export interface UpdateDonorRequest
  extends z.infer<typeof zUpdateDonorRequest> {}
