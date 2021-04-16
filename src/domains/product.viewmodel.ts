import { IsNotEmpty } from 'class-validator';

export class ProductViewModel {
  constructor(
      sku: string, 
      quantity: number, 
      name: string, 
      createdAt: Date, 
      items: Object, 
      days: number, 
      providerDays: number,   
      resp: string,
      und: string,
      sector: string,
      provider: string,
    ) { 
    this.sku = sku ?? name;
    this.quantity = quantity;
    this.name = name;
    this.createdAt = createdAt;
    this.items = items;
    this.days = days;
    this.providerDays = providerDays;
    this.resp = resp;
    this.und = und;
    this.sector = sector;
    this.provider = provider;
  }

  @IsNotEmpty()
  readonly sku: string;

  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly name: string;

  readonly createdAt: Date;

  readonly items: Object;

  readonly days: number;

  readonly providerDays: number;

  readonly resp: string;
  readonly und: string;
  readonly sector: string;
  readonly provider: string;

}
