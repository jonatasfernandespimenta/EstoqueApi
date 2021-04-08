import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async createItem(@Body() Item: ItemViewModel) {
    return this.itemService.createItem(Item);
  }

  @Get('delete/:id')
  async updateItem(@Param() params, @Body() body) {
    return this.itemService.removeItem(params.id, body);
  }

}
