import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductViewModel } from 'src/domains/product.viewmodel';
import { ProductRepository } from 'src/repositories/product.respository';

@Injectable()
export class ProductService {
  constructor(readonly productRepository: ProductRepository) {  }

  async getProducts() {
    return this.productRepository.getProducts();
  }

  async getProduct(id) {
    return this.productRepository.getById(id);
  }

  async updateProduct(newProps, id) {
    return this.productRepository.updateProduct(newProps, id);
  }

  async inventoryWithdraw(newProps, id) {
    const product = await this.productRepository.getById(id);

    let newQtd

    if(newProps.type === 'withdraw') {
      if(product.quantity === 0 || product.quantity < newProps.quantity) {
        throw new HttpException('The requested quantity is grater than the quantity in inventory', HttpStatus.BAD_REQUEST);
      }
      newQtd = product.quantity - newProps.quantity
    } else {
      newQtd = product.quantity + newProps.quantity
    }


    return this.productRepository.updateProduct({ quantity: newQtd }, id);
  }

  async createProduct(newProduct: ProductViewModel) {
    const productList = await this.productRepository.getProducts();

    const foundProduct = productList.find(
      product => product.sku === newProduct.sku
    );

    if(foundProduct) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    return this.productRepository.createProduct(newProduct);

  }

}
