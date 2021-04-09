import { IsNotEmpty } from 'class-validator';

export class ItemViewModel {
  constructor(createdAt: Date, sku: String) {
    this.createdAt = createdAt;
    this.sku = sku;
  }

  @IsNotEmpty()
  readonly sku: String;

  readonly quantity: number;

  readonly productName: String;

  readonly createdAt: Date;

}
