"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_viewmodel_1 = require("../domains/item.viewmodel");
const item_schema_1 = require("../domains/schemas/item.schema");
let ItemRepository = class ItemRepository {
    constructor(ItemCollection) {
        this.ItemCollection = ItemCollection;
    }
    async getById(id) {
        return await this.ItemCollection
            .findOne({ _id: id })
            .lean();
    }
    async getItems() {
        return await this.ItemCollection
            .find()
            .lean();
    }
    async createItem(newItem) {
        return await this.ItemCollection.create(newItem);
    }
    async updateItem(newProps, id) {
        return await this.ItemCollection.findByIdAndUpdate(id, newProps);
    }
    async deleteItem(id) {
        return await this.ItemCollection.findByIdAndDelete(id);
    }
};
ItemRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Item')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ItemRepository);
exports.ItemRepository = ItemRepository;
//# sourceMappingURL=item.repository.js.map