import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { ProductService } from '@resources/product/product.service';
import { AuthGuard } from '@common/guards';
import { UserService } from '@resources/user/user.service';

@Injectable()
@UseGuards(AuthGuard)
export class WishlistService {
	constructor(
		@InjectRepository(Wishlist)
		private readonly wishlistRepos: Repository<Wishlist>,
		private readonly userService: UserService,
		private readonly productService: ProductService
	) {}

	async create(userId: string) {
		const user = await this.userService.findById(userId);
		const wishlist = this.wishlistRepos.create({ user });
		return this.wishlistRepos.save(wishlist);
	}

	findAll() {
		return `This action returns all wishlist`;
	}

	async findOne(id: string) {
		const result = await this.wishlistRepos.findOne({
			where: { id },
			relations: {
				products: true,
			},
		});

		if (!result) throw new NotFoundException();
		return result;
	}

	async update(id: string, updateWishlistDto: UpdateWishlistDto) {
		const product = await this.productService.findOne(
			updateWishlistDto.productId
		);
		delete updateWishlistDto.productId;

		const oldWishlist = await this.findOne(id);
		return this.wishlistRepos.save({
			...oldWishlist,
			products: oldWishlist.products.concat(product),
		});
	}

	async remove(id: string) {
		await this.findOne(id);
		return (await this.wishlistRepos.delete(id)).affected > 0;
	}
}
