import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariantDto {
	@IsNumber()
	@Type(() => Number)
	@IsNotEmpty()
	stock: number;

	@IsString()
	colorId: string;

	@IsString()
	@IsOptional()
	sizeId?: string;

	@IsNumber()
	@Type(() => Number)
	price: number;

	@IsOptional()
	@IsString()
	image: string;
}
