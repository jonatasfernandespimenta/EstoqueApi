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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("../repositories/log.repository");
const dayjs = require('dayjs');
const _ = require('lodash');
let LogService = class LogService {
    constructor(logRepository) {
        this.logRepository = logRepository;
    }
    async getlogs() {
        const logs = await this.logRepository.getLogs();
        const dataByDate1 = _.groupBy(logs, ({ inputDate }) => dayjs(inputDate).format('DD-MM-YYYY'));
        const result1 = _.mapValues(dataByDate1, (entries) => _.sumBy(entries, 'quantity'));
        const dataByDate2 = _.groupBy(logs, ({ withdrawDate }) => dayjs(withdrawDate).format('DD-MM-YYYY'));
        const result2 = _.mapValues(dataByDate2, (entries) => _.sumBy(entries, 'quantity'));
        const inputResult = Object.entries(result1).map(([key, qtd]) => { return { 'date': key, 'qtd': qtd }; });
        const withdrawResult = Object.entries(result2).map(([key, qtd]) => { return { 'date': key, 'qtd': qtd }; });
        const finalResult = { 'input': inputResult[0], 'withdraw': withdrawResult[1] };
        return finalResult;
    }
    async getlog(id) {
        return this.logRepository.getById(id);
    }
    async updatelog(newProps, id) {
        return this.logRepository.updateLog(newProps, id);
    }
    async createLog(body) {
        return this.logRepository.createLog(body);
    }
};
LogService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [log_repository_1.LogRepository])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map