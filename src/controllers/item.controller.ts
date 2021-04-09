import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemService } from 'src/services/item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {  }

  @Get('/')
  async getItems() {
    return this.itemService.getItems();
  }

  @Get('/:id')
  async getItem(@Param() params) {
    return this.itemService.getItem(params.id);
  }

  @Post('/')
  async createItem(@Body() Item: ItemViewModel, @Res() res) {
    const response = await this.itemService.createItem(Item);
    if(response.created) {
      return res.sendFile(join(__dirname, '..', '..', 'teste.txt'));
    }
  }

  @Get('delete/:id')
  async updateItem(@Param() params) {
    return this.itemService.removeItem(params.id);
  }

}
