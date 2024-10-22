import { model, Schema, Document, models, Model } from 'mongoose';
import { UserEntity } from '../../types/users';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isAdmin: {
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

export default (models.User as Model<UserDocument>) ||
  model<UserDocument>('User', UserSchema);
