import { CartItem } from '@resources/cart_item/entities/cart_item.entity';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
	@IsNotEmpty()
	totalPrice: number;

	@IsEmpty()
	cartItem: CartItem[];
}
