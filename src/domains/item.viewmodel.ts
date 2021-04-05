import { IsNotEmpty } from 'class-validator';

export class ItemViewModel {
  constructor(price: number, createdAt: Date) {
    this.price = price;
    this.createdAt = createdAt;
  }

  @IsNotEmpty()
  readonly price: number;

  readonly createdAt: Date;

}
