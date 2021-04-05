import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './domains/schemas/product.schema';
import { ItemSchema } from './domains/schemas/item.schema';
import { ProductRepository } from './repositories/product.respository';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { ItemRepository } from './repositories/item.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/estoquedb', {
      useFindAndModify: false
    }),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Item', schema: ItemSchema },
    ]),
  ],
  controllers: [
    ProductController, 
    AppController,
    ItemController
  ],
  providers: [
    ProductService, 
    AppService,
    ProductRepository,
    ItemService,
    ItemRepository
  ],
})
export class AppModule { }
