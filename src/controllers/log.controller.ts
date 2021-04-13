import { Controller, Delete, Get, Param } from '@nestjs/common';
import { LogService } from 'src/services/log.service';
import { runInThisContext } from 'vm';

@Controller('/log')
export class LogController {
  constructor(private logService: LogService) {  }

  @Get('/')
  async getLog() {
    return this.logService.getlogs();
  }

  @Delete('/:id')
  async removeLog(@Param() params) {
    return this.logService.deleteLog(params.id);
  }

}
