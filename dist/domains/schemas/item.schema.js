"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose = require("mongoose");
exports.ItemSchema = new mongoose.Schema({
    price: Number,
    sku: String,
    createdAt: { type: Date, default: Date.now }
});
//# sourceMappingURL=item.schema.js.map