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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_viewmodel_1 = require("../domains/product.viewmodel");
const product_schema_1 = require("../domains/schemas/product.schema");
let ProductRepository = class ProductRepository {
    constructor(productCollection) {
        this.productCollection = productCollection;
    }
    async getById(id) {
        return await this.productCollection
            .findOne({ _id: id })
            .populate('items');
    }
    async deleteProduct(id) {
        return await this.productCollection.findByIdAndDelete(id);
    }
    async getProducts() {
        return await this.productCollection
            .find()
            .lean();
    }
    async createProduct(newProduct) {
        return await this.productCollection.create(newProduct);
    }
    async updateProduct(newProps, id) {
        return await this.productCollection.findByIdAndUpdate(id, newProps);
    }
    async getProductByNameOrSku(param) {
        return await this.productCollection.find({ $or: [{ name: { $regex: '.*' + param + '.*' }, sku: { $regex: '.*' + param + '.*' } }] });
    }
};
ProductRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.respository.js.map