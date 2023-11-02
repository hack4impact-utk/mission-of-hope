import { model, Schema, Document, models, Model } from 'mongoose';
import { UserEntry } from '../../types/persons';

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
    admin: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface UserDocument extends Omit<UserEntry, '_id'>, Document {}

export default (models.Donation as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
