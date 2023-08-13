import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '@resources/category/entities/category.entity';
import { ResponseItem } from './dto/ReponsiveItem';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product) private productRepos: Repository<Product>
	) {}

	async create(createProductDto: CreateProductDto) {
		try {
			const category = await Category.findOneBy({
				id: createProductDto.categoryId,
			});
			const product = this.productRepos.create(createProductDto);

			// return question;
			return this.productRepos.save({
				...product,
				category,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll() {
		const findAllProduct = await this.productRepos.find({
			relations: {
				category: true,
			},
		});
		return findAllProduct;
	}

	async findOne(id: string) {
		try {
			const result = await this.productRepos.findOne({
				where: { id },
				relations: {
					category: true,
				},
			});
			if (!result) throw new NotFoundException();
			return result;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async update(id: string, updateProductDto: UpdateProductDto) {
		try {
			const category = await Category.findOneBy({
				id: updateProductDto.categoryId,
			});

			delete updateProductDto.categoryId;
			const oldData = await this.productRepos.findOneBy({ id });

			return this.productRepos.save({
				...oldData,
				...updateProductDto,
				category,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		try {
			await this.productRepos.delete(id);
			const product: Product = await this.productRepos.findOne({
				where: { id },
			});
			return new ResponseItem<Product>(product, 'delete success');
		} catch (error) {
			throw new BadRequestException(error.mess);
		}
	}
}
