import { model, Schema, Document, models, Model } from 'mongoose';
import { Donor } from '../../types/persons';

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
    donation: {
      type: Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export interface DonorDocument extends Omit<Donor, '_id'>, Document {}

export default (models.Donation as Model<DonorDocument>) ||
  model<DonorDocument>('Donor', DonorSchema);
