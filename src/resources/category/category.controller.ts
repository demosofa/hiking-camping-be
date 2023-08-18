import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@common/decorators';
import { ROLE } from '@common/enums';

@Controller('category')
@Auth(ROLE.ADMIN)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}
	@Auth(ROLE.ADMIN)
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	create(
		@UploadedFile()
		file: Express.Multer.File,
		@Body() createCategoryDto: CreateCategoryDto
	) {
		if (file) createCategoryDto.image = file.path;
		return this.categoryService.create(createCategoryDto);
	}

	@Get()
	findAll() {
		return this.categoryService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(id);
	}
	@Auth(ROLE.ADMIN)
	@Patch(':id')
	@UseInterceptors(FileInterceptor('file'))
	update(
		@UploadedFile()
		file: Express.Multer.File,
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		if (file) {
			updateCategoryDto.isNewImage = true;
			updateCategoryDto.image = file.path;
		}
		return this.categoryService.update(id, updateCategoryDto);
	}
	@Auth(ROLE.ADMIN)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(id);
	}
}
