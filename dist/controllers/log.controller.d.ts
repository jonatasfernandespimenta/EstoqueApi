import { LogService } from 'src/services/log.service';
export declare class LogController {
    private logService;
    constructor(logService: LogService);
    getLog(): Promise<{
        input: {
            date: string;
            qtd: unknown;
        };
        withdraw: {
            date: string;
            qtd: unknown;
        };
    }>;
}
