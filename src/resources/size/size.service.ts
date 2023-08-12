import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { Variant } from '../variant/entities/variant.entity';

@Injectable()
export class SizeService {
	async create(createSizeDto: CreateSizeDto) {
		try {
			let size = await Size.findOneBy({
				size: createSizeDto.size,
			});
			if (size) throw new BadRequestException('Already existed this size');
			size = Size.create({ ...createSizeDto });

			return Size.save({ ...size });
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	findAll() {
		return Size.find();
	}

	async findOne(id: string) {
		const isExisted = await Size.findOneBy({ id });
		if (!isExisted) throw new NotFoundException();
		return isExisted;
	}

	async update(id: string, updateSizeDto: UpdateSizeDto) {
		try {
			await this.findOne(id);
			const size = await Size.findOneBy({
				size: updateSizeDto.size,
			});
			if (size) throw new Error('size alreay existed');

			return Size.save({ id, ...updateSizeDto });
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		await this.findOne(id);
		const lstVariant = await Variant.findBy({
			size: {
				id,
			},
		});
		if (!lstVariant.length) return (await Size.delete({ id })).affected > 0;
	}
}
