import { IsEmpty, IsNotEmpty, isNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCartItemDto {
	@IsNotEmpty()
	quantity: number;

	@IsNotEmpty()
	itemPrice: number;

	@IsNotEmpty()
	image: string;

	@IsNotEmpty()
	nameCart: string;

	@IsNotEmpty()
	totalPrice: number;

	@IsEmpty()
	variantId: string;

	@IsNotEmpty()
	userId: string;
}
