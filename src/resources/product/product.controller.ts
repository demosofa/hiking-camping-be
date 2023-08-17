import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseItem } from '../../common/types/ResponseItem';
import { Product } from './entities/product.entity';
import { Auth } from '@common/decorators';
import { ROLE } from '@common/enums';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Auth(ROLE.ADMIN)
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id);
	}
	@Auth(ROLE.ADMIN)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(id, updateProductDto);
	}
	@Auth(ROLE.ADMIN)
	@Delete(':id')
	remove(@Param('id') id: string): Promise<ResponseItem<Product>> {
		return this.productService.remove(id);
	}
}
