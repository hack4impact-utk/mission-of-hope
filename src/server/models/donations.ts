import { model, Schema, Document, models, Model } from 'mongoose';
import { DonationEntity } from '../../types/donation';

const DonationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'DonationItem',
      required: true,
    },
    entryDate: {
      type: Date,
      required: true,
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface DonationDocument
  extends Omit<DonationEntity, '_id'>,
    Document {}

export default (models.Donation as Model<DonationDocument>) ||
  model<DonationDocument>('Donation', DonationSchema);
