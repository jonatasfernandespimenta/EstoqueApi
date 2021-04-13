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

    const dataByDate1 = _.groupBy(logs, ({ inputDate }) => dayjs(inputDate).format('DD-MM-YYYY'));
    const result1 = _.mapValues(dataByDate1, (entries) => ({
      sku: _.get(entries, '[0].sku'),
      quantity: _.sumBy(entries, 'quantity')
    }));

    const dataByDate2 = _.groupBy(logs, ({ withdrawDate }) => dayjs(withdrawDate).format('DD-MM-YYYY'));
    const result2 = _.mapValues(dataByDate2, (entries) => ({
      sku: _.get(entries, '[0].sku'),
      quantity: _.sumBy(entries, 'quantity')
    }));

    const inputResult = Object.entries(result1).map(([key, qtd]) => { return {'date': key, 'info': qtd} })
    const withdrawResult = Object.entries(result2).map(([key, qtd]) => { return {'date': key, 'info': qtd} })

    const finalResult = {
      'input': inputResult.map((i) => i).filter(x => x.date !== 'Invalid Date'), 
      'withdraw': withdrawResult.map((i) => i).filter(x => x.date !== 'Invalid Date')
    }

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

  async deleteLog(id) {
    return this.logRepository.deleteLog(id);
  }

}
