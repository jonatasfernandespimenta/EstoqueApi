import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(readonly itemRepository: ItemRepository) {  }

  async getItems() {
    return this.itemRepository.getItems();
  }

  async getItem(id) {
    return this.itemRepository.getById(id);
  }

  async updateItem(newProps, id) {
    return this.itemRepository.updateItem(newProps, id);
  }

  async removeItem(id) {
    return this.itemRepository.deleteItem(id)
  }

  async createItem(newItem: ItemViewModel) {
    return this.itemRepository.createItem(newItem);
  }

}
