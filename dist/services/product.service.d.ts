import { ProductViewModel } from 'src/domains/product.viewmodel';
import { ProductRepository } from 'src/repositories/product.respository';
export declare class ProductService {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository);
    getProducts(): Promise<import("../domains/schemas/product.schema").Product[]>;
    getByNameOrSku(params: any): Promise<import("../domains/schemas/product.schema").Product[]>;
    getProduct(id: any): Promise<import("../domains/schemas/product.schema").Product>;
    delProduct(id: any): Promise<import("../domains/schemas/product.schema").Product>;
    updateProduct(newProps: any, id: any): Promise<import("../domains/schemas/product.schema").Product>;
    inventoryWithdraw(newProps: any, id: any): Promise<import("../domains/schemas/product.schema").Product>;
    createProduct(newProduct: ProductViewModel): Promise<import("../domains/schemas/product.schema").Product>;
}
