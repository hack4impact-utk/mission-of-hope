import { model, Schema, Document, models, Model } from 'mongoose';
import { z } from 'zod';

const zReceiptBase = z.object({
  seq: z.number(),
});

export interface ReceiptEntity extends z.infer<typeof zReceiptBase> {}

const ReceiptSchema = new Schema(
  {
    seq: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface ReceiptDocument extends Omit<ReceiptEntity, '_id'>, Document {}

export default (models.Receipt as Model<ReceiptDocument>) ||
  model<ReceiptDocument>('Receipt', ReceiptSchema);
