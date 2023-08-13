import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	vender: string;

	@IsNotEmpty()
	description: string;

	@IsString()
	categoryId: string;
}
