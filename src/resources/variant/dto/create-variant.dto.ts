import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariantDto {
	@IsNumber()
	@IsNotEmpty()
	stock: number;

	@IsString()
	colorId: string;

	@IsString()
	@IsOptional()
	sizeId?: string;

	@IsNumber()
	price: number;
}
