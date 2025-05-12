import zBase from './base';
import { z } from 'zod';
import zObjectId from './objectId';
import { zCreateItemRequest, zItemResponse } from './items';
import { zUserResponse } from './users';
import { zDonorResponse, zCreateDonorRequest } from './donors';

export const evaluationEnum = ['High', 'Low', 'New'] as const;

export const zDonationItemBase = z.object({
  item: z.union([zObjectId, zCreateItemRequest]),
  quantity: z.number(),
  barcode: z.string().optional(),
  value: z.object({
    price: z.number(),
    evaluation: z.enum(evaluationEnum),
  }),
});

export const zDonationItemEntity = zDonationItemBase.extend({ ...zBase.shape });

export const zCreateDonationItemRequest = zDonationItemBase;

export const zDonationItemResponse = zDonationItemEntity.extend({
  item: zItemResponse,
});

export const zUpdateDonationItemRequest = zCreateDonationItemRequest.partial();

export interface DonationItemEntity
  extends z.infer<typeof zDonationItemEntity> {}

export interface CreateDonationItemRequest
  extends z.infer<typeof zCreateDonationItemRequest> {}

export interface DonationItemResponse
  extends z.infer<typeof zDonationItemResponse> {}

export interface UpdateDonationItemRequest
  extends z.infer<typeof zUpdateDonationItemRequest> {}

export const zDonationBase = z.object({
  user: zObjectId,
  items: z.array(zObjectId),
  entryDate: z.coerce.date(),
  donor: zObjectId,
  receipt: z.string(),
});

export const zDonationEntity = zDonationBase.extend({ ...zBase.shape });

export const zCreateDonationRequest = zDonationBase.extend({
  donor: z.union([zObjectId, zCreateDonorRequest]),
  items: z.array(zCreateDonationItemRequest),
});

export const zDonationResponse = zDonationEntity.extend({
  _id: zObjectId,
  user: zUserResponse,
  donor: zDonorResponse,
  items: z.array(zDonationItemResponse),
});

export const zUpdateDonationRequest = zCreateDonationRequest.partial();

export interface DonationEntity extends z.infer<typeof zDonationEntity> {}

export interface CreateDonationRequest
  extends z.infer<typeof zCreateDonationRequest> {}

export interface DonationResponse extends z.infer<typeof zDonationResponse> {}

export interface UpdateDonationRequest
  extends z.infer<typeof zUpdateDonationRequest> {}
