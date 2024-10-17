import zBase from './base';
import { z } from 'zod';

const zPersonBase = z.object({
  lastName: z.string(),
  firstName: z.string().optional(),
  email: z.string(),
});

export const zUserEntity = zBase.extend({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  isAdmin: z.boolean(),
});

export const zUserResponse = zUserEntity;

export interface UserEntity extends z.infer<typeof zUserEntity> {}

export interface UserResponse extends z.infer<typeof zUserResponse> {}

export const zDonorBase = zPersonBase.extend({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.number(),
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
