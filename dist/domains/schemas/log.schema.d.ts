import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface Log extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly inputDate: Date;
    readonly withdrawDate: Date;
    readonly quantity: Number;
    readonly sku: String;
}
export declare const LogSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
