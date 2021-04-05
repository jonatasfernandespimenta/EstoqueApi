import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
import { ProductRepository } from 'src/repositories/product.respository';
import { ProductService } from './product.service';

const QRCode = require("qrcode");

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
    const foundItem = await this.itemRepository.getById(id);

    const productList = await this.productRepository.getProducts();
    
    const foundProduct = productList.find(
      product => product.sku === foundItem.sku
    );

    await this.productRepository.updateProduct(
      {
        quantity: foundProduct.quantity - 1,
      }, 
      foundProduct._id
    );

    return this.itemRepository.deleteItem(id)
  }

  async createItem(newItem: ItemViewModel) {
    const productList = await this.productRepository.getProducts();
    
    const foundProduct = productList.find(
      product => product.sku === newItem.sku
    );

    const createdItem = await this.itemRepository.createItem(newItem);
    
    let itens = []; 

    foundProduct.items.toString().split(',').map(item => itens.push(item))

    itens.push(createdItem._id)

    await this.productRepository.updateProduct(
      {
        quantity: foundProduct.quantity + 1,
        items: itens
      }, 
      foundProduct._id
    );

    const qrcode = await QRCode.toDataURL(`http://192.168.15.161:3000/item/delete/${createdItem._id}`);

    return {createdItem, qrcode};
  }

}
