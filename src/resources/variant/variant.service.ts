import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ColorService } from '../color/color.service';
import { SizeService } from './../size/size.service';
import { Color } from '../color/entities/color.entity';
import { Size } from '../size/entities/size.entity';
import { Variant } from './entities/variant.entity';
import { unlinkSync } from 'fs';
import { ProductService } from '@resources/product/product.service';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class VariantService {
	constructor(
		private readonly colorService: ColorService,
		private readonly sizeService: SizeService,
		private readonly productService: ProductService
	) {}
	async create(createVariantDto: CreateVariantDto) {
		try {
			let color: Color;
			let size: Size;
			let product: Product;
			if (createVariantDto.colorId) {
				color = await this.colorService.findOne(createVariantDto.colorId);
				delete createVariantDto.colorId;
			}
			if (createVariantDto.sizeId) {
				size = await this.sizeService.findOne(createVariantDto.sizeId);
				delete createVariantDto.sizeId;
			}
			if (createVariantDto.productId) {
				product = await this.productService.findOne(createVariantDto.productId);
				delete createVariantDto.productId;
			}

			const variant = Variant.create({
				...createVariantDto,
				color,
				size,
				product,
			});
			return Variant.save(variant);
		} catch (error) {
			if (createVariantDto.image) {
				unlinkSync(createVariantDto.image);
			}
			throw new BadRequestException(error.message);
		}
	}

	findAll() {
		return Variant.find({
			relations: {
				color: true,
				size: true,
				cartItem: true,
			},
		});
	}

	async findOne(id: string) {
		const isExisted = await Variant.findOneBy({ id });
		if (!isExisted) throw new NotFoundException();
		return isExisted;
	}

	async update(id: string, updateVariantDto: UpdateVariantDto) {
		try {
			await this.findOne(id);

			let color: Color;
			let size: Size;
			let product: Product;
			if (updateVariantDto.colorId) {
				color = await this.colorService.findOne(updateVariantDto.colorId);
				delete updateVariantDto.colorId;
			}
			if (updateVariantDto.sizeId) {
				size = await this.sizeService.findOne(updateVariantDto.sizeId);
				delete updateVariantDto.sizeId;
			}
			if (updateVariantDto.productId) {
				product = await this.productService.findOne(updateVariantDto.sizeId);
				delete updateVariantDto.sizeId;
			}

			const oldData = await Variant.findOneBy({ id });

			if (updateVariantDto.isNewImage) {
				unlinkSync(oldData.image);
			}

			return Variant.save({
				...oldData,
				...updateVariantDto,
				color,
				size,
				product,
			});
		} catch (error) {
			if (updateVariantDto.isNewImage) {
				unlinkSync(updateVariantDto.image);
			}
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		try {
			const beforeDeleted = await this.findOne(id);
			const result = await Variant.delete(id);
			unlinkSync(beforeDeleted.image);
			return result.affected > 0;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
