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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const item_viewmodel_1 = require("../domains/item.viewmodel");
const item_repository_1 = require("../repositories/item.repository");
const product_respository_1 = require("../repositories/product.respository");
let ItemService = class ItemService {
    constructor(itemRepository, productRepository) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
    }
    async getItems() {
        return this.itemRepository.getItems();
    }
    async getItem(id) {
        return this.itemRepository.getById(id);
    }
    async updateItem(newProps, id) {
        return this.itemRepository.updateItem(newProps, id);
    }
    async removeItem(id) {
        return this.itemRepository.deleteItem(id);
    }
    async createItem(newItem) {
        const productList = await this.productRepository.getProducts();
        const foundProduct = productList.find(product => product.sku === newItem.sku);
        const createdItem = await this.itemRepository.createItem(newItem);
        await this.productRepository.updateProduct({
            quantity: foundProduct.quantity + 1,
            items: [foundProduct.items, createdItem._id]
        }, foundProduct._id);
        return createdItem;
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [item_repository_1.ItemRepository,
        product_respository_1.ProductRepository])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map