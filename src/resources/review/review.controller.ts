import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ResponseItem } from '@resources/product/dto/ReponsiveItem';
import { Review } from './entities/review.entity';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post()
	create(@Body() createReviewDto: CreateReviewDto) {
		return this.reviewService.create(createReviewDto);
	}

	@Get()
	findAll() {
		return this.reviewService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
		return this.reviewService.update(id, updateReviewDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<ResponseItem<Review>> {
		return this.reviewService.remove(id);
	}
}