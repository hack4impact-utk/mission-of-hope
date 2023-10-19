import { model, Schema, Document, models, Model } from 'mongoose';
import { User } from '../../types/persons';

const UserSchema = new Schema(
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

export interface UserDocument extends Omit<User, '_id'>, Document {}

export default (models.Donation as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
