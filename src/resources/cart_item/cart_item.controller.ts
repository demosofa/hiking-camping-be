import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { AuthGuard } from '@common/guards';
import { ReqUser } from '@common/decorators';

@Controller('cart-item')
@UseGuards(AuthGuard)
export class CartItemController {
	constructor(private readonly cartItemService: CartItemService) {}

	@Post()
	create(
		@ReqUser('id') userId: string,
		@Body() createCartItemDto: CreateCartItemDto
	) {
		createCartItemDto.userId = userId;
		return this.cartItemService.create(createCartItemDto);
	}

	@Get()
	findAll() {
		return this.cartItemService.findAll();
	}

	@Get('user')
	findCartItemByUserId(@ReqUser('id') id: string) {
		return this.cartItemService.findCartItemByUserId(id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cartItemService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCartItemDto: UpdateCartItemDto
	) {
		return this.cartItemService.update(id, updateCartItemDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.cartItemService.remove(id);
	}
}
