import { model, Schema, Document, models, Model } from 'mongoose';
import { MailMergeEntity, mailType } from '@/types/mailMerge';

const MailMergeSchema = new Schema(
  {
    type: {
      type: String,
      enum: mailType,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface MailMergeDocument
  extends Omit<MailMergeEntity, '_id'>,
    Document {}

export default (models.MailMerge as Model<MailMergeDocument>) ||
  model<MailMergeDocument>('MailMerge', MailMergeSchema);
