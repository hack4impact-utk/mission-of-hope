import { Document, Model, Schema, model, models } from 'mongoose';
import { DonationItemEntity, evaluationEnum } from '../../types/donation';

const DonationItemSchema = new Schema(
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
      type: String,
      required: false,
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

export default (models.DonationItems as Model<DonationItemDocument>) ||
  model<DonationItemDocument>(
    'DonationItems',
    DonationItemSchema,
    'donationItems'
  );
