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
	ParseFilePipeBuilder,
	HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './public',
				filename(req, file, callback) {
					return callback(null, `${Date.now()}.${extname(file.originalname)}`);
				},
			}),
		})
	)
	create(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: /jpeg|jpg|png|gif/,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				})
		)
		file: Express.Multer.File,
		@Body() createCategoryDto: CreateCategoryDto
	) {
		console.log(file.path);
		createCategoryDto.image = file.path;
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

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return this.categoryService.update(id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(id);
	}
}
