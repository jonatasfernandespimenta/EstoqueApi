import { Model } from 'mongoose';
import { ProductViewModel } from 'src/domains/product.viewmodel';
import { Product } from 'src/domains/schemas/product.schema';
export declare class ProductRepository {
    private readonly productCollection;
    constructor(productCollection: Model<Product>);
    getById(id: any): Promise<Product>;
    getProducts(): Promise<Product[]>;
    createProduct(newProduct: ProductViewModel): Promise<Product>;
    updateProduct(newProps: any, id: any): Promise<Product>;
}
