import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateWishlistDto {
	@IsNotEmpty()
	@IsUUID()
	productId: string;
}
