import zBase from './base';
import { z } from 'zod';

export const zUserEntity = zBase.extend({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  isAdmin: z.boolean(),
});

export const zUserResponse = zUserEntity;

export interface UserEntity extends z.infer<typeof zUserEntity> {}

export interface UserResponse extends z.infer<typeof zUserResponse> {}
