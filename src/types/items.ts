import { z } from 'zod';
import zBase from './base';

export const zItemBase = z.object({
  category: z.string().trim(),
  name: z.string().trim(),
  high: z.number().optional(),
  low: z.number().optional(),
});

export const zItemEntity = zItemBase.extend({ ...zBase.shape });

export const zCreateItemRequest = zItemBase;

export const zItemResponse = zItemEntity;

export const zUpdateItemRequest = zCreateItemRequest.partial();

export interface ItemEntity extends z.infer<typeof zItemEntity> {}

export interface CreateItemRequest extends z.infer<typeof zCreateItemRequest> {}

export interface ItemResponse extends z.infer<typeof zItemResponse> {}

export interface UpdateItemRequest extends z.infer<typeof zUpdateItemRequest> {}
