import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { Item } from 'src/domains/schemas/item.schema';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel('Item') private readonly ItemCollection: Model<Item>
  ) {  }

  async getById(id): Promise<Item> {
    return await this.ItemCollection
      .findOne({ _id: id })
      .lean()
  }

  async getItems(): Promise<Item[]> {
    return await this.ItemCollection
      .find()
      .lean();
  }

  async createItem(newItem: ItemViewModel) {
    return await this.ItemCollection.create(newItem);
  }

  async updateItem(newProps, id) {
    return await this.ItemCollection.findByIdAndUpdate(
      id,
      newProps
    )
  }

  async deleteItem(id) {
    return await this.ItemCollection.findByIdAndDelete(id);
  }

}
