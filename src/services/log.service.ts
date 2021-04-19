import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/repositories/log.repository';
const dayjs = require('dayjs');

const _ = require('lodash');

@Injectable()
export class LogService {
  constructor(
    readonly logRepository: LogRepository
  ) {  }

  async getlogs() {
    const logs = await this.logRepository.getLogs();

    const product = [];

    for (const datum of logs) {
      let existing = product.find(p => p.name === datum.sku);
      let found = product.some(p => p.name === datum.sku)

      if (!existing) {
        existing = {
          name: datum.sku,
          exits: [],
        }
      }

      if(!found) {
        existing.exits.push({
          withdrawDate: dayjs(datum.withdrawDate).format('DD-MM-YYYY'),
          inputDate: dayjs(datum.inputDate).format('DD-MM-YYYY') === 'Invalid Date' ? null : dayjs(datum.inputDate).format('DD-MM-YYYY'),
          quantity: datum.quantity
        })
        product.push(existing);

      }

    }
    const returnData = { product };

    return returnData;
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

  async deleteLog(id) {
    return this.logRepository.deleteLog(id);
  }

}
