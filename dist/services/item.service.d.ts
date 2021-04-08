import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
import { LogRepository } from 'src/repositories/log.repository';
import { ProductRepository } from 'src/repositories/product.respository';
export declare class ItemService {
    readonly itemRepository: ItemRepository;
    readonly productRepository: ProductRepository;
    readonly logRepository: LogRepository;
    constructor(itemRepository: ItemRepository, productRepository: ProductRepository, logRepository: LogRepository);
    getItems(): Promise<import("../domains/schemas/item.schema").Item[]>;
    getItem(id: any): Promise<import("../domains/schemas/item.schema").Item>;
    updateItem(newProps: any, id: any): Promise<import("../domains/schemas/item.schema").Item>;
    removeItem(id: any, body: any): Promise<import("../domains/schemas/item.schema").Item>;
    createItem(newItem: ItemViewModel): Promise<{
        created: boolean;
    }>;
}
