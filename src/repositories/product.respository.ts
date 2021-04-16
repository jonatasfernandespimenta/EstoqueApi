import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductViewModel } from 'src/domains/product.viewmodel';
import { Product } from 'src/domains/schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product') private readonly productCollection: Model<Product>
  ) {  }

  async getById(id): Promise<Product> {
    return await this.productCollection
      .findOne({ _id: id })
      .populate('items');
  }

  async deleteProduct(id) {
    return await this.productCollection.findByIdAndDelete(id);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productCollection
      .find()
      .lean();
  }

  async createProduct(newProduct: ProductViewModel) {
    return await this.productCollection.create(newProduct);
  }

  async updateProduct(newProps, id) {
    return await this.productCollection.findByIdAndUpdate(
      id,
      newProps
    )
  }

  async getProductByNameOrSku(param) {
    return await this.productCollection.find({ $or: [{name: { $regex: '.*' + param + '.*' }, sku: { $regex: '.*' + param + '.*' }}] })
  }

}
