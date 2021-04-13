import { LogService } from 'src/services/log.service';
export declare class LogController {
    private logService;
    constructor(logService: LogService);
    getLog(): Promise<{
        input: {
            date: string;
            info: unknown;
        }[];
        withdraw: {
            date: string;
            info: unknown;
        }[];
    }>;
    removeLog(params: any): Promise<import("../domains/schemas/log.schema").Log>;
}
