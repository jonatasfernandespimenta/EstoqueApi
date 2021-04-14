import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface Product extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly sku: string;
    readonly quantity: number;
    readonly name: string;
    readonly createdAt: Date;
    readonly items: Object;
    readonly days: number;
    readonly providerDays: number;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<any, {}>, mongoose.Model<any, any>, undefined>;
