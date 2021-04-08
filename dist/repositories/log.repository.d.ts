import { Model } from 'mongoose';
import { LogViewModel } from 'src/domains/log.viewmodel';
import { Log } from 'src/domains/schemas/log.schema';
export declare class LogRepository {
    private readonly LogCollection;
    constructor(LogCollection: Model<Log>);
    getById(id: any): Promise<Log>;
    getLogs(): Promise<Log[]>;
    createLog(newLog: LogViewModel): Promise<Log>;
    updateLog(newProps: any, id: any): Promise<Log>;
    deleteLog(id: any): Promise<Log>;
}
