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
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@common/decorators';
import { ROLE } from '@common/enums';

@Controller('variant')
@Auth(ROLE.ADMIN)
export class VariantController {
	constructor(private readonly variantService: VariantService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	create(
		@UploadedFile() file: Express.Multer.File,
		@Body() createVariantDto: CreateVariantDto
	) {
		if (file) createVariantDto.image = file.path;
		return this.variantService.create(createVariantDto);
	}

	@Get()
	findAll() {
		return this.variantService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.variantService.findOne(id);
	}

	@Patch(':id')
	@UseInterceptors(FileInterceptor('file'))
	update(
		@UploadedFile() file: Express.Multer.File,
		@Param('id') id: string,
		@Body() updateVariantDto: UpdateVariantDto
	) {
		if (file) {
			updateVariantDto.isNewImage = true;
			updateVariantDto.image = file.path;
		}
		return this.variantService.update(id, updateVariantDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.variantService.remove(id);
	}
}
