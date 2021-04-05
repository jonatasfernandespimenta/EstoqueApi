import { IsNotEmpty } from 'class-validator';

export class ItemViewModel {
  constructor(price: number, createdAt: Date, sku: String) {
    this.price = price;
    this.createdAt = createdAt;
    this.sku = sku;
  }

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly sku: String;

  readonly createdAt: Date;

}
