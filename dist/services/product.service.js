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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_viewmodel_1 = require("../domains/product.viewmodel");
const product_respository_1 = require("../repositories/product.respository");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getProducts() {
        return this.productRepository.getProducts();
    }
    async getProduct(id) {
        return this.productRepository.getById(id);
    }
    async updateProduct(newProps, id) {
        return this.productRepository.updateProduct(newProps, id);
    }
    async inventoryWithdraw(newProps, id) {
        const product = await this.productRepository.getById(id);
        let newQtd;
        if (newProps.type === 'withdraw') {
            if (product.quantity === 0 || product.quantity < newProps.quantity) {
                throw new common_1.HttpException('The requested quantity is grater than the quantity in inventory', common_1.HttpStatus.BAD_REQUEST);
            }
            newQtd = product.quantity - newProps.quantity;
        }
        else {
            newQtd = product.quantity + newProps.quantity;
        }
        return this.productRepository.updateProduct({ quantity: newQtd }, id);
    }
    async createProduct(newProduct) {
        const productList = await this.productRepository.getProducts();
        const foundProduct = productList.find(product => product.sku === newProduct.sku);
        if (foundProduct) {
            throw new common_1.HttpException('Product already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.productRepository.createProduct(newProduct);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [product_respository_1.ProductRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map