import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemRepository } from 'src/repositories/item.repository';
export declare class ItemService {
    readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository);
    getItems(): Promise<import("../domains/schemas/item.schema").Item[]>;
    getItem(id: any): Promise<import("../domains/schemas/item.schema").Item>;
    updateItem(newProps: any, id: any): Promise<import("../domains/schemas/item.schema").Item>;
    removeItem(id: any): Promise<import("../domains/schemas/item.schema").Item>;
    createItem(newItem: ItemViewModel): Promise<import("../domains/schemas/item.schema").Item>;
}
