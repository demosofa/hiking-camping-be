import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
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
	findOne(@ReqUser('id') userId: string) {
		return this.wishlistService.findOne(userId);
	}

	@Patch()
	update(
		@ReqUser('id') userId: string,
		@Body() updateWishlistDto: UpdateWishlistDto
	) {
		return this.wishlistService.update(userId, updateWishlistDto);
	}

	@Delete()
	remove(@ReqUser('id') userId: string) {
		return this.wishlistService.remove(userId);
	}
}
