import { IsEmpty, IsNotEmpty, isNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCartItemDto {
	@IsNotEmpty()
	quantity: number;

	@IsNotEmpty()
	itemPrice: number;

	@IsNotEmpty()
	nameCart: string;

	@IsEmpty()
	variantId: string;

	@IsEmpty()
	userId: string;
}
