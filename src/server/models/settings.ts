import { SettingsEntity } from '@/types/settings';
import { Model, Schema, model, models } from 'mongoose';

const SettingsSchema = new Schema(
  {
    allowedEmails: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

SettingsSchema.post('find', function (docs: SettingsEntity[]) {
  docs.forEach((doc) => {
    doc._id = doc._id.toString();
  });
});

SettingsSchema.post('findOne', function (doc: SettingsEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

SettingsSchema.post(/findById/, function (doc: SettingsEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

export interface SettingsDocument
  extends Omit<SettingsEntity, '_id'>,
    Document {}

export default (models.Settings as Model<SettingsDocument>) ||
  model<SettingsDocument>('Settings', SettingsSchema, 'settings');
