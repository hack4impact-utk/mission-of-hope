import { model, Schema, Document, models, Model } from 'mongoose';
import { Donation } from '../../types/donation';

const DonationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
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
    value: {
      type: Schema.Types.ObjectId,
      ref: 'Value',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export interface DonationDocument extends Omit<Donation, '_id'>, Document {}

export default (models.Donation as Model<DonationDocument>) ||
  model<DonationDocument>('Donation', DonationSchema);
