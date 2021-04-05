import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
import { ProductRepository } from 'src/repositories/product.respository';
export declare class ItemService {
    readonly itemRepository: ItemRepository;
    readonly productRepository: ProductRepository;
    constructor(itemRepository: ItemRepository, productRepository: ProductRepository);
    getItems(): Promise<import("../domains/schemas/item.schema").Item[]>;
    getItem(id: any): Promise<import("../domains/schemas/item.schema").Item>;
    updateItem(newProps: any, id: any): Promise<import("../domains/schemas/item.schema").Item>;
    removeItem(id: any): Promise<import("../domains/schemas/item.schema").Item>;
    createItem(newItem: ItemViewModel): Promise<import("../domains/schemas/item.schema").Item>;
}
