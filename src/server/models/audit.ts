import { model, Model, models, Schema } from 'mongoose';
import { auditActionType, auditDocumentType, AuditEntity } from '@/types/audit';

const AuditSchema = new Schema({
  actionType: {
    type: String,
    enum: auditActionType,
    required: true,
  },
  docType: {
    type: String,
    enum: auditDocumentType,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doc: {
    type: Schema.Types.ObjectId,
    refPath: 'docType',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  oldFields: {
    type: Map,
    of: String,
    required: false,
  },
  newFields: {
    type: Map,
    of: String,
    required: false,
  },
});

export interface AuditDocument extends Omit<AuditEntity, '_id'>, Document {}

export default (models.Audit as Model<AuditDocument>) ||
  model<AuditDocument>('Audit', AuditSchema);
