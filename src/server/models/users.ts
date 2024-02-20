import { model, Schema, Document, models, Model } from 'mongoose';
import { UserEntity } from '../../types/persons';

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

export interface UserDocument extends Omit<UserEntity, '_id'>, Document {}

export default (models.Users as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
