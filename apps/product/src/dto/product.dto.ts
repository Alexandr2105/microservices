import { Transform } from 'class-transformer';
import { IsNumber, Length } from 'class-validator';

export class ProductDto {
  @Transform(({ value }) => value.trim())
  @Length(3, 30)
  name: string;

  @Transform(({ value }) => value.trim())
  @Length(10, 500)
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
