import { ProductViewModel } from 'src/domains/product.viewmodel';
import { ProductService } from 'src/services/product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): Promise<import("../domains/schemas/product.schema").Product[]>;
    getProduct(params: any): Promise<import("../domains/schemas/product.schema").Product>;
    createProduct(product: ProductViewModel): Promise<import("../domains/schemas/product.schema").Product>;
    updateProduct(product: ProductViewModel, params: any): Promise<import("../domains/schemas/product.schema").Product>;
    getByNameOrSku(params: any): Promise<import("../domains/schemas/product.schema").Product[]>;
}
