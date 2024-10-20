import zBase from './base';
import { z } from 'zod';

const zPersonBase = z.object({
  lastName: z.string(),
  firstName: z.string().optional(),
  email: z.string(),
});

export const zUserBase = zPersonBase.extend({
  admin: z.boolean(),
});

export const zUserEntity = zUserBase.extend({ ...zBase.shape });

export const zCreateUserRequest = zUserBase;

export const zUserResponse = zUserEntity;

export interface UserEntity extends z.infer<typeof zUserEntity> {}

export interface CreateUserRequest extends z.infer<typeof zCreateUserRequest> {}

export interface UserResponse extends z.infer<typeof zUserResponse> {}
