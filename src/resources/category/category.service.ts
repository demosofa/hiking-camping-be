import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepos: Repository<Category>
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		try {
			const parentCategory = await Category.findOneBy({
				id: createCategoryDto.parentCategoryId,
			});
			const product = this.categoryRepos.create(createCategoryDto);
			return this.categoryRepos.save({
				...product,
				parentCategory,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll() {
		const findAllCategory = await this.categoryRepos.find({
			relations: {
				parentCategory: true,
			},
		});
		return findAllCategory;
	}

	async findOne(id: string) {
		try {
			const result = await this.categoryRepos.findOne({
				where: { id },
				relations: {
					parentCategory: true,
				},
			});
			if (!result) throw new NotFoundException();
			return result;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		try {
			const parentCategory = await Category.findOneBy({
				id: updateCategoryDto.parentCategoryId,
			});
			delete updateCategoryDto.parentCategoryId;
			const oldData = await this.categoryRepos.findOneBy({ id });

			if (updateCategoryDto.isNewImage) {
				unlinkSync(oldData.image);
			}

			return this.categoryRepos.save({
				...oldData,
				...updateCategoryDto,
				parentCategory,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		try {
			const beforeDeleted = await this.findOne(id);
			const result = await this.categoryRepos.delete(id);
			unlinkSync(beforeDeleted.image);
			return result.affected > 0;
		} catch (error) {
			throw new BadRequestException(error.mess);
		}
	}
}
