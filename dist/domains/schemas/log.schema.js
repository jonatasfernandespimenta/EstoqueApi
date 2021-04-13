"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSchema = void 0;
const mongoose = require("mongoose");
exports.LogSchema = new mongoose.Schema({
    inputDate: Date,
    withdrawDate: Date,
    quantity: Number,
    sku: String
});
//# sourceMappingURL=log.schema.js.map