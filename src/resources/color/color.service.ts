import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { Variant } from '../variant/entities/variant.entity';

@Injectable()
export class ColorService {
	async create(createColorDto: CreateColorDto) {
		try {
			let color = await Color.findOneBy({
				color: createColorDto.color,
			});
			if (color) throw new BadRequestException('Already existed this color');
			color = Color.create({ ...createColorDto });

			return Color.save({ ...color });
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	findAll() {
		return Color.find();
	}

	async findOne(id: string) {
		const isExisted = await Color.findOneBy({ id });
		if (!isExisted) throw new NotFoundException();
		return isExisted;
	}

	async update(id: string, updateColorDto: UpdateColorDto) {
		try {
			await this.findOne(id);
			const color = await Color.findOneBy({
				color: updateColorDto.color,
			});
			if (color) throw new Error('color already existed');

			return Color.save({ id, ...updateColorDto });
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		await this.findOne(id);
		const lstVariant = await Variant.find({
			where: {
				color: {
					id,
				},
			},
		});
		if (!lstVariant.length) return (await Color.delete({ id })).affected > 0;
	}
}
