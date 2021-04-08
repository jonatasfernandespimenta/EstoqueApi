import { Controller, Get } from '@nestjs/common';
import { LogService } from 'src/services/log.service';

@Controller('/log')
export class LogController {
  constructor(private logService: LogService) {  }

  @Get('/')
  async getLog() {
    return this.logService.getlogs();
  }
}
