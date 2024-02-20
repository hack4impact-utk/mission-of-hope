import { model, Schema, Document, models, Model } from 'mongoose';
import { ItemEntity } from '../../types/items';

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    high: {
      type: Number,
      required: false,
    },
    low: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
    tracking: true,
  }
);

export interface ItemDocument extends Omit<ItemEntity, '_id'>, Document {}

export default (models.Items as Model<ItemDocument>) ||
  model<ItemDocument>('Item', ItemSchema);
