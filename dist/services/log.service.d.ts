import { LogRepository } from 'src/repositories/log.repository';
export declare class LogService {
    readonly logRepository: LogRepository;
    constructor(logRepository: LogRepository);
    getlogs(): Promise<{
        input: {
            date: string;
            qtd: unknown;
        };
        withdraw: {
            date: string;
            qtd: unknown;
        };
    }>;
    getlog(id: any): Promise<import("../domains/schemas/log.schema").Log>;
    updatelog(newProps: any, id: any): Promise<import("../domains/schemas/log.schema").Log>;
    createLog(body: any): Promise<import("../domains/schemas/log.schema").Log>;
}
