import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
	constructor(
		@InjectRepository(Cart)
		private readonly cartRepo: Repository<Cart>
	) {}

	async create(createCartDto: CreateCartDto) {
		const cartSave = this.cartRepo.create(createCartDto);
		return await this.cartRepo.save(cartSave);
	}

	async findAll(
		orderBy = ['id', 'totalPrice'],
		orderDirection: 'ASC' | 'DESC' = 'ASC'
	): Promise<Cart[]> {
		return await this.cartRepo.find({
			order: orderBy.reduce((order, field) => {
				order[field] = orderDirection;
				return order;
			}, {}),
			relations: {
				cartItem: true,
			},
		});
	}

	async findOne(id: string) {
		return await this.cartRepo.findOne({
			where: { id },
			relations: {
				cartItem: true,
			},
		});
	}

	async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
		const cartIndex = await this.findOne(id);
		if (!cartIndex) {
			throw new BadRequestException('Cart not found');
		}
		return this.cartRepo.save({ ...cartIndex, ...updateCartDto });
	}

	async remove(id: string): Promise<void> {
		const catIndex = await this.findOne(id);
		if (!catIndex) {
			throw new BadRequestException('Cart not found');
		}
		this.cartRepo.softDelete(id);
	}
}
