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
import { WishlistService } from './wishlist.service';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ReqUser } from '@common/decorators';
import { AuthGuard } from '@common/guards';

@Controller('wishlist')
@UseGuards(AuthGuard)
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}

	@Post()
	create(@ReqUser('id') userId: string) {
		return this.wishlistService.create(userId);
	}

	@Get()
	findAll() {
		return this.wishlistService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.wishlistService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateWishlistDto: UpdateWishlistDto
	) {
		return this.wishlistService.update(id, updateWishlistDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.wishlistService.remove(id);
	}
}
