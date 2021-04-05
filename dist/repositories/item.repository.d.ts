import { Model } from 'mongoose';
import { ItemViewModel } from 'src/domains/item.viewmodel';
import { Item } from 'src/domains/schemas/item.schema';
export declare class ItemRepository {
    private readonly ItemCollection;
    constructor(ItemCollection: Model<Item>);
    getById(id: any): Promise<Item>;
    getItems(): Promise<Item[]>;
    createItem(newItem: ItemViewModel): Promise<Item>;
    updateItem(newProps: any, id: any): Promise<Item>;
    deleteItem(id: any): Promise<Item>;
}
