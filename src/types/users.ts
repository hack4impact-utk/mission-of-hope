import zBase from './base';
import { z } from 'zod';
import zObjectId from './objectId';

export const zUserEntity = zBase.extend({
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  isAdmin: z.boolean(),
});

export const zUserResponse = zUserEntity;

export const zUpdateAllowedUsersRequest = z.object({
  userEmails: z.array(z.string().email()).optional(),
  adminIds: z.array(zObjectId).optional(),
});

export interface UserEntity extends z.infer<typeof zUserEntity> {}

export interface UserResponse extends z.infer<typeof zUserResponse> {}

export interface UpdateAllowedUsersRequest
  extends z.infer<typeof zUpdateAllowedUsersRequest> {}
