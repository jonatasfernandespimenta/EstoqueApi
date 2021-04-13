import { IsNotEmpty } from "class-validator";

export class LogViewModel {
  constructor(inputDate: Date, withdrawDate: Date, quantity: number, sku: String) {
    this.inputDate = inputDate;
    this.withdrawDate = withdrawDate;
    this.quantity = quantity;
    this.sku = sku;
  }

  readonly inputDate: Date;

  readonly withdrawDate: Date;

  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly sku: String;

}
