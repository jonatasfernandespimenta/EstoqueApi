import { IsNotEmpty } from "class-validator";

export class LogViewModel {
  constructor(inputDate: Date, withdrawDate: Date, quantity: number) {
    this.inputDate = inputDate;
    this.withdrawDate = withdrawDate;
    this.quantity = quantity;
  }

  readonly inputDate: Date;

  readonly withdrawDate: Date;

  @IsNotEmpty()
  readonly quantity: number;
}
