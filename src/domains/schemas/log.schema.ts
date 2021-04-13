import * as mongoose from 'mongoose';

import { Document } from 'mongoose';

export interface Log extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;  
  readonly inputDate: Date;
  readonly withdrawDate: Date;
  readonly quantity: Number;
  readonly sku: String;
}

export const LogSchema = new mongoose.Schema({
  inputDate: Date,
  withdrawDate: Date,
  quantity: Number,
  sku: String
})
