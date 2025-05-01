import { z } from 'zod';
import zObjectId from './objectId';
import zBase from './base';
import { zUserResponse } from './users';

export const auditActionType = ['Add', 'Edit', 'Delete'] as const;

// These must match key names for corresponding mongoose Schemas (accessible with Object.keys(models))
export const auditDocumentType = ['Donation', 'Donor', 'DonationItem'] as const;

export const zAuditBase = z.object({
  actionType: z.enum(auditActionType),
  docType: z.enum(auditDocumentType),
  user: zObjectId,
  doc: zObjectId,
  timestamp: z.string().datetime(),
  newFields: z.map(z.string(), z.string()).optional(),
  oldFields: z.map(z.string(), z.string()).optional(),
});

export const zAuditEntity = zAuditBase.extend({ ...zBase.shape });

export interface AuditEntity extends z.infer<typeof zAuditEntity> {}

export const zAuditResponse = zAuditEntity.extend({
  user: zUserResponse,
});
