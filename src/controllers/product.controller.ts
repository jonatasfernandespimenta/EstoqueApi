import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductViewModel } from 'src/domains/product.viewmodel';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {  }

  @Get('/')
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param() params) {
    return this.productService.getProduct(params.id);
  }

  @Post('/')
  async createProduct(@Body() product: ProductViewModel) {
    return this.productService.createProduct(product);
  }

  @Put('/:id')
  async updateProduct(@Body() product: ProductViewModel, @Param() params) {
    return this.productService.inventoryWithdraw(product, params.id);
  }

  @Get('/name/:param')
  async getByNameOrSku(@Param() params) {
    return this.productService.getByNameOrSku(params.param);
  }

}
