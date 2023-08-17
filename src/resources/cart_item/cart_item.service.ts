import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { Variant } from '@resources/variant/entities/variant.entity';
import { VariantService } from '@resources/variant/variant.service';
import { UserService } from '@resources/user/user.service';
import { User } from '@resources/user/entities/user.entity';

@Injectable()
export class CartItemService {
	constructor(
		@InjectRepository(CartItem)
		private readonly cartItemRepo: Repository<CartItem>,
		private readonly userService: UserService,
		private readonly variantService: VariantService
	) {}

	async create(createCartItemDto: CreateCartItemDto) {
		try {
			let user: User;
			let variant: Variant;
			if (createCartItemDto.userId) {
				user = await this.userService.findById(createCartItemDto.userId);
				delete createCartItemDto.userId;
			}
			if (createCartItemDto.variantId) {
				variant = await this.variantService.findOne(
					createCartItemDto.variantId
				);
				delete createCartItemDto.variantId;
			}

			const cartItem = CartItem.create({
				...createCartItemDto,
				user,
				variant,
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

	async findCartItemByUserId(userId: string) {
		const user = await this.userService.findById(userId);
		return user.cartItem;
	}

	async findOne(id: string) {
		const result = await this.cartItemRepo.findOne({
			where: { id },
			relations: { variant: true },
		});
		if (!result) throw new NotFoundException();
		return result;
	}

	async update(id: string, updateCartItemDto: UpdateCartItemDto) {
		await this.findOne(id);
		return CartItem.save({ id, ...updateCartItemDto });
	}

	async remove(id: string): Promise<void> {
		const catIndex = await this.findOne(id);
		if (!catIndex) {
			throw new BadRequestException('Cart not found');
		}
		this.cartItemRepo.softDelete(id);
	}
}
