import { model, Schema, Document, models, Model } from 'mongoose';
import { evaluationEnum } from '../../types/donation';
import { DonationItemEntity } from '../../types/donation';

const DonationItemtSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    barcode: {
      type: [String],
      required: true,
    },
    value: {
      type: {
        price: {
          type: Number,
          required: true,
        },
        evaluation: {
          type: String,
          enum: evaluationEnum,
          required: false,
        },
        inRange: {
          type: Boolean,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface DonationItemDocument
  extends Omit<DonationItemEntity, '_id'>,
    Document {}

export default (models.Donation as Model<DonationItemDocument>) ||
  model<DonationItemDocument>('Value', DonationItemtSchema);
