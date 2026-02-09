import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name!: string;

  @IsString()
  readonly description!: string;

  @IsString()
  readonly price!: string;

  @IsString()
  readonly category!: string;

  @IsString({ each: true })
  readonly images!: string[];

  @IsNumber()
  readonly stock!: number;
}
