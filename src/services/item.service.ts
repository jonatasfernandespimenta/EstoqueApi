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
    await this.logRepository.createLog({ inputDate: null, withdrawDate: new Date(), quantity: body.quantity })

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
  }

  async createItem(newItem: ItemViewModel) {
    await this.logRepository.createLog({ inputDate: new Date(), withdrawDate: null, quantity: 1 })

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

    const qrcode = await QRCode.toDataURL(`http://192.168.15.161:3000/item/delete/${createdItem._id}`);

    const zpl = `^FO20,0^BY4,2.0,65^BQN,2,10^FDMA0http://192.168.15.161:3000/item/delete/${createdItem._id}^FS`

    const data = fs.readFileSync('teste.txt', 'utf8');

    if(data.includes('^XA')) {
      countLinesInFile('teste.txt', (error: Error, numberOfLines: number) => {
        insertLine('teste.txt').content(zpl).at(numberOfLines-1).then(function(err) {
          console.log('saas')
        })
      });
    } else {
      fs.appendFile('teste.txt', '^XA\n' + zpl + '\n\n^XZ', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    

    return { createdItem, qrcode };
  }

}
