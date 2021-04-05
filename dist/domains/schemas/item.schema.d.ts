import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface Item extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly createdAt: Date;
    readonly price: number;
    readonly sku: String;
}
export declare const ItemSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
