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
exports.LogRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const log_viewmodel_1 = require("../domains/log.viewmodel");
const log_schema_1 = require("../domains/schemas/log.schema");
let LogRepository = class LogRepository {
    constructor(LogCollection) {
        this.LogCollection = LogCollection;
    }
    async getById(id) {
        return await this.LogCollection
            .findOne({ _id: id })
            .lean();
    }
    async getLogs() {
        return await this.LogCollection
            .find()
            .lean();
    }
    async createLog(newLog) {
        return await this.LogCollection.create(newLog);
    }
    async updateLog(newProps, id) {
        return await this.LogCollection.findByIdAndUpdate(id, { withdrawDate: newProps.withdrawDate });
    }
    async deleteLog(id) {
        return await this.LogCollection.findByIdAndDelete(id);
    }
};
LogRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Log')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LogRepository);
exports.LogRepository = LogRepository;
//# sourceMappingURL=log.repository.js.map