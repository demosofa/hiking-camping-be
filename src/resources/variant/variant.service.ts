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

@Injectable()
export class VariantService {
	constructor(
		private readonly colorService: ColorService,
		private readonly sizeService: SizeService
	) {}
	async create(createVariantDto: CreateVariantDto) {
		try {
		} catch (error) {
			throw new BadRequestException(error.message);
		}
		let color: Color;
		let size: Size;
		if (createVariantDto.colorId) {
			color = await this.colorService.findOne(createVariantDto.colorId);
			delete createVariantDto.colorId;
		}
		if (createVariantDto.sizeId) {
			size = await this.sizeService.findOne(createVariantDto.sizeId);
			delete createVariantDto.sizeId;
		}

		const variant = Variant.create({ ...createVariantDto, color, size });
		return Variant.save(variant);
	}

	findAll() {
		return Variant.find();
	}

	async findOne(id: string) {
		const isExisted = await Variant.findOneBy({ id });
		if (!isExisted) throw new NotFoundException();
		return isExisted;
	}

	async update(id: string, updateVariantDto: UpdateVariantDto) {
		await this.findOne(id);

		let color: Color;
		let size: Size;
		if (updateVariantDto.colorId) {
			color = await this.colorService.findOne(updateVariantDto.colorId);
			delete updateVariantDto.colorId;
		}
		if (updateVariantDto.sizeId) {
			size = await this.sizeService.findOne(updateVariantDto.sizeId);
			delete updateVariantDto.sizeId;
		}

		return Variant.save({ id, ...updateVariantDto, color, size });
	}

	async remove(id: string) {
		await this.findOne(id);
		return (await Variant.delete(id)).affected > 0;
	}
}
