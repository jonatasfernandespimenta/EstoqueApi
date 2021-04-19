import { LogRepository } from 'src/repositories/log.repository';
export declare class LogService {
    readonly logRepository: LogRepository;
    constructor(logRepository: LogRepository);
    getlogs(): Promise<{
        product: any[];
    }>;
    getlog(id: any): Promise<import("../domains/schemas/log.schema").Log>;
    updatelog(newProps: any, id: any): Promise<import("../domains/schemas/log.schema").Log>;
    createLog(body: any): Promise<import("../domains/schemas/log.schema").Log>;
    deleteLog(id: any): Promise<import("../domains/schemas/log.schema").Log>;
}
