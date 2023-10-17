import { model, Schema, Document, models, Model } from 'mongoose';
import { User } from '../../types/persons';

const UserSchema = new Schema({
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
  donationid: {
    type: Schema.Types.ObjectId,
    ref: 'Donation Id',
    required: true,
  },
});

export interface UserDocument extends Omit<User, '_id'>, Document {}

export default (models.Donation as Model<UserDocument>) ||
  model<UserDocument>('Donation', UserSchema);
