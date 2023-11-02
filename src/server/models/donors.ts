import { model, Schema, Document, models, Model } from 'mongoose';
import { DonorEntry } from '../../types/persons';

const DonorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface DonorDocument extends Omit<DonorEntry, '_id'>, Document {}

export default (models.Donation as Model<DonorDocument>) ||
  model<DonorDocument>('Donor', DonorSchema);
