import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { ItemSchema } from './item.schema';

export interface Product extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly sku: string,
  readonly quantity: number,
  readonly name: string,
  readonly createdAt: Date,
  readonly items: Object
  readonly days: number;
} 

export const ProductSchema = new mongoose.Schema({
  sku: String,
  quantity: Number,
  name: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  createdAt: { type: Date, default: Date.now },
  days: Number
})
