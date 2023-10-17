import { model, Schema, Document, models, Model } from 'mongoose';
import { Value } from '../../types/donation';

const ValueSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    enum: ['Low', 'High'],
    required: false,
  },
  inRange: {
    type: Boolean,
    required: true,
  },
  donationid: {
    type: Schema.Types.ObjectId,
    ref: 'Donation Id',
    required: true,
  },
});

export interface ValueDocument extends Omit<Value, '_id'>, Document {}

export default (models.Donation as Model<ValueDocument>) ||
  model<ValueDocument>('Donation', ValueSchema);
