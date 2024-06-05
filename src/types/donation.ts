import zBase from './base';
import { z } from 'zod';
import zObjectId from './objectId';
import { zItemResponse } from './items';
import { zDonorResponse, zUserResponse } from './persons';

export const evaluationEnum = ['High', 'Low', 'New'] as const;

export const zDonationItemBase = z.object({
  item: zObjectId,
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
  receipt: z.number(),
});

export const zDonationEntity = zDonationBase.extend({ ...zBase.shape });

export const zCreateDonationRequest = zDonationBase;

export const zDonationResponse = zDonationEntity.extend({
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
