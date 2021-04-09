import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
import { LogRepository } from 'src/repositories/log.repository';
import { ProductRepository } from 'src/repositories/product.respository';
import { ProductService } from './product.service';

const fs = require('fs');
const insertLine = require('insert-line')
const countLinesInFile = require('count-lines-in-file');

const QRCode = require("qrcode");

@Injectable()
export class ItemService {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly productRepository: ProductRepository,
    readonly logRepository: LogRepository
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

  async removeItem(id, body) {
    const res = await this.logRepository.createLog({ inputDate: null, withdrawDate: new Date(), quantity: body.quantity }).then(async() => {
      const foundItem = await this.itemRepository.getById(id);
  
      const productList = await this.productRepository.getProducts();
      
      const foundProduct = productList.find(
        product => product.sku === foundItem.sku
      );
  
      await this.productRepository.updateProduct(
        { quantity: foundProduct.quantity - 1 }, 
        foundProduct._id
      );

      return this.itemRepository.deleteItem(id);
    })
    return res;

  }

  async createItem(newItem: ItemViewModel) {
    let created = false;
    fs.truncate('teste.txt', 0, function(){console.log('')})
    await this.logRepository.createLog({ inputDate: new Date(), withdrawDate: null, quantity: newItem.quantity })
    for (let i = 0; i <= newItem.quantity; i++) {
      const productList = await this.productRepository.getProducts();
      
      const foundProduct = productList.find(
        product => product.sku === newItem.sku
      );
  
      const createdItem = await this.itemRepository.createItem(newItem);
      
      let itens = []; 

      if(foundProduct.items == "") {
        itens.push(createdItem._id)
      } else {
        foundProduct.items.toString().split(',').map(item => itens.push(item))
        itens.push(createdItem._id)
      }
  
      await this.productRepository.updateProduct(
        {
          quantity: foundProduct.quantity + 1,
          items: itens
        }, 
        foundProduct._id
      );

      const zpl = `
      ^FO20,0^BY4,2.0,${i == 0 ? 65 : i * 500}^BQN,2,10^FDMA0http://192.168.15.161:3000/item/delete/${createdItem._id}^FS
      ^FB300,2,2
      ^FB380,2,2
      ^FO16,${(i+1) * 450}^A0N,18,18^FD${newItem.productName}^FS
      `

      fs.appendFile('teste.txt', '\n^XA\n' + zpl + '\n^XZ', function (err) {
        if (err) throw err;
        created = true
      });
      
    }
    
    return {'created': created};
  }

}
