import { ItemViewModel } from 'src/domains/item.viewmodel';
import { ItemService } from 'src/services/item.service';
export declare class ItemController {
    private itemService;
    constructor(itemService: ItemService);
    getItems(): Promise<import("../domains/schemas/item.schema").Item[]>;
    getItem(params: any): Promise<import("../domains/schemas/item.schema").Item>;
    createItem(Item: ItemViewModel): Promise<{
        createdItem: import("../domains/schemas/item.schema").Item;
        qrcode: any;
    }>;
    updateItem(params: any, body: any): Promise<import("../domains/schemas/item.schema").Item>;
}
