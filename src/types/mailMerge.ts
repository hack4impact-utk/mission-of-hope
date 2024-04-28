import { z } from 'zod';
import zBase from './base';

export const mailType = ['Receipt', 'Monthly', 'Yearly'] as const;

export const zMailMergeBase = z.object({
  type: z.enum(mailType),
  subject: z.string(),
  body: z.string(),
});

export const zMailMergeEntity = zMailMergeBase.extend({ ...zBase.shape });

export const zCreateMailMergeRequest = zMailMergeBase;

export const zMailMergeResponse = zMailMergeEntity;

export interface MailMergeEntity extends z.infer<typeof zMailMergeBase> {}

export interface CreateMailMergeRequest
  extends z.infer<typeof zCreateMailMergeRequest> {}

export interface MailMergeResponse extends z.infer<typeof zMailMergeResponse> {}
