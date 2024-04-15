import { model, Schema, Document, models, Model } from 'mongoose';
import { DonorEntity } from '../../types/persons';

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
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface DonorDocument extends Omit<DonorEntity, '_id'>, Document {}

export default (models.Donor as Model<DonorDocument>) ||
  model<DonorDocument>('Donor', DonorSchema);
