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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const item_viewmodel_1 = require("../domains/item.viewmodel");
const item_service_1 = require("../services/item.service");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    async getItems() {
        return this.itemService.getItems();
    }
    async getItem(params) {
        return this.itemService.getItem(params.id);
    }
    async createItem(Item, res) {
        await this.itemService.createItem(Item);
        return res.sendFile(path_1.join(__dirname, '..', '..', 'teste.txt'));
    }
    async updateItem(params, body) {
        return this.itemService.removeItem(params.id, body);
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItems", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItem", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_viewmodel_1.ItemViewModel, Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createItem", null);
__decorate([
    common_1.Post('delete/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateItem", null);
ItemController = __decorate([
    common_1.Controller('item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map