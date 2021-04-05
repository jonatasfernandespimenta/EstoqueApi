import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
import { ProductRepository } from 'src/repositories/product.respository';
import { ProductService } from './product.service';

@Injectable()
export class ItemService {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly productRepository: ProductRepository
  ) {  }

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
    const productList = await this.productRepository.getProducts();
    
    const foundProduct = productList.find(
      product => product.sku === newItem.sku
      );
      
    const createdItem = await this.itemRepository.createItem(newItem);

    await this.productRepository.updateProduct(
      {
        quantity: foundProduct.quantity + 1,
        items: [foundProduct.items[0] === undefined ? null : foundProduct.items, createdItem._id]
      }, 
      foundProduct._id
    );

    return createdItem;
  }

}
