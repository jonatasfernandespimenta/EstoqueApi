import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogViewModel } from 'src/domains/log.viewmodel';
import { Log } from 'src/domains/schemas/log.schema';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel('Log') private readonly LogCollection: Model<Log>
  ) {  }

  async getById(id): Promise<Log> {
    return await this.LogCollection
      .findOne({ _id: id })
      .lean()
  }

  async getLogs(): Promise<Log[]> {
    return await this.LogCollection
      .find()
      .lean();
  }

  async createLog(newLog: LogViewModel) {
    return await this.LogCollection.create(newLog);
  }

  async updateLog(newProps, id) {
    return await this.LogCollection.findByIdAndUpdate(
      id,
      { withdrawDate: newProps.withdrawDate }
    )
  }

  async deleteLog(id) {
    return await this.LogCollection.findByIdAndDelete(id);
  }

}
