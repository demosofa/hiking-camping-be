import { CartService } from './../carts/cart.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { Cart } from '@resources/carts/entities/cart.entity';
import { Variant } from '@resources/variant/entities/variant.entity';
import { VariantService } from '@resources/variant/variant.service';

@Injectable()
export class CartItemService {
	constructor(
		@InjectRepository(CartItem)
		private readonly cartItemRepo: Repository<CartItem>,
		private readonly cartService: CartService,
		private readonly variantService: VariantService
	) {}

	async create(createCartItemDto: CreateCartItemDto) {
		try {
			let cartId: Cart;
			let variantId: Variant;
			if (createCartItemDto.cartId) {
				cartId = await this.cartService.findOne(createCartItemDto.cartId);
				delete createCartItemDto.cartId;
			}
			if (createCartItemDto.variantId) {
				variantId = await this.variantService.findOne(
					createCartItemDto.variantId
				);
				delete createCartItemDto.variantId;
			}

			const cartItem = CartItem.create({
				...createCartItemDto,
				cartId,
				variantId,
			});
			return CartItem.save(cartItem);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll(
		orderBy = ['id', 'quantity', 'itemPrice'],
		orderDirection: 'ASC' | 'DESC' = 'ASC'
	): Promise<CartItem[]> {
		return await this.cartItemRepo.find({
			order: orderBy.reduce((order, field) => {
				order[field] = orderDirection;
				return order;
			}, {}),
		});
	}

	async findOne(id: string): Promise<CartItem | null> {
		return await this.cartItemRepo.findOneBy({ id });
	}

	async update(id: string, updateCartItemDto: UpdateCartItemDto) {
		await this.findOne(id);

		let cartId: Cart;
		let variantId: Variant;
		if (updateCartItemDto.cartId) {
			cartId = await this.cartService.findOne(updateCartItemDto.cartId);
			delete updateCartItemDto.cartId;
		}
		if (updateCartItemDto.variantId) {
			variantId = await this.variantService.findOne(
				updateCartItemDto.variantId
			);
			delete updateCartItemDto.variantId;
		}

		return CartItem.save({ id, ...updateCartItemDto, cartId, variantId });
	}

	async remove(id: string): Promise<void> {
		const catIndex = await this.findOne(id);
		if (!catIndex) {
			throw new BadRequestException('Cart not found');
		}
		this.cartItemRepo.softDelete(id);
	}
}
