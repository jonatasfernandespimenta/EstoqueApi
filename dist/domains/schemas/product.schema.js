"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    sku: String,
    quantity: Number,
    name: String,
    items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }],
    createdAt: { type: Date, default: Date.now }
});
//# sourceMappingURL=product.schema.js.map