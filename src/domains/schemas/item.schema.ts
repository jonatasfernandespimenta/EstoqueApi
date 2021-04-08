import * as mongoose from 'mongoose';

import { Document } from 'mongoose';

export interface Item extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly createdAt: Date;
  readonly sku: String;
}

export const ItemSchema = new mongoose.Schema({
  sku: String,
  createdAt: { type: Date, default: Date.now }
});
