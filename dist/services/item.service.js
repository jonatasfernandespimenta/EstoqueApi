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
const log_repository_1 = require("../repositories/log.repository");
const product_respository_1 = require("../repositories/product.respository");
const fs = require('fs');
const insertLine = require('insert-line');
const countLinesInFile = require('count-lines-in-file');
const QRCode = require("qrcode");
let ItemService = class ItemService {
    constructor(itemRepository, productRepository, logRepository) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
        this.logRepository = logRepository;
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
    async removeItem(id, body) {
        await this.logRepository.createLog({ inputDate: null, withdrawDate: new Date(), quantity: body.quantity });
        const foundItem = await this.itemRepository.getById(id);
        const productList = await this.productRepository.getProducts();
        const foundProduct = productList.find(product => product.sku === foundItem.sku);
        await this.productRepository.updateProduct({ quantity: foundProduct.quantity - 1 }, foundProduct._id);
        return this.itemRepository.deleteItem(id);
    }
    async createItem(newItem) {
        await this.logRepository.createLog({ inputDate: new Date(), withdrawDate: null, quantity: 1 });
        const productList = await this.productRepository.getProducts();
        const foundProduct = productList.find(product => product.sku === newItem.sku);
        const createdItem = await this.itemRepository.createItem(newItem);
        let itens = [];
        if (foundProduct.items == "") {
            itens.push(createdItem._id);
        }
        else {
            foundProduct.items.toString().split(',').map(item => itens.push(item));
            itens.push(createdItem._id);
        }
        await this.productRepository.updateProduct({
            quantity: foundProduct.quantity + 1,
            items: itens
        }, foundProduct._id);
        const qrcode = await QRCode.toDataURL(`http://192.168.15.161:3000/item/delete/${createdItem._id}`);
        const zpl = `^FO20,0^BY4,2.0,65^BQN,2,10^FDMA0http://192.168.15.161:3000/item/delete/${createdItem._id}^FS`;
        const data = fs.readFileSync('teste.txt', 'utf8');
        if (data.includes('^XA')) {
            countLinesInFile('teste.txt', (error, numberOfLines) => {
                insertLine('teste.txt').content(zpl).at(numberOfLines - 1).then(function (err) {
                    console.log('saas');
                });
            });
        }
        else {
            fs.appendFile('teste.txt', '^XA\n' + zpl + '\n\n^XZ', function (err) {
                if (err)
                    throw err;
                console.log('Saved!');
            });
        }
        return { createdItem, qrcode };
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [item_repository_1.ItemRepository,
        product_respository_1.ProductRepository,
        log_repository_1.LogRepository])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map