import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

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

	@IsOptional()
	@IsUUID()
	variantId: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
