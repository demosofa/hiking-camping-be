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
import { ResponseItem } from '@resources/product/dto/ReponsiveItem';

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
		// const createCategory = await this.categoryRepos.create(createCategoryDto);
		// return await this.categoryRepos.save(createCategory);
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
			await this.categoryRepos.delete(id);
			const category: Category = await this.categoryRepos.findOne({
				where: { id },
			});

			return new ResponseItem<Category>(category, 'delete success');
		} catch (error) {
			throw new BadRequestException(error.mess);
		}
	}
}
