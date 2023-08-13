import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Product } from '@resources/product/entities/product.entity';
import { ResponseItem } from '@resources/product/dto/ReponsiveItem';

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review) private reviewRepos: Repository<Review>
	) {}
	async create(createReviewDto: CreateReviewDto) {
		try {
			const product = await Product.findOneBy({
				id: createReviewDto.productId,
			});
			const review = this.reviewRepos.create(createReviewDto);

			// return question;
			return this.reviewRepos.save({
				...review,
				product,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll() {
		const findAllReview = await this.reviewRepos.find({
			relations: {
				product: true,
			},
		});
		return findAllReview;
	}

	async findOne(id: string) {
		try {
			const result = await this.reviewRepos.findOne({
				where: { id },
				relations: {
					product: true,
				},
			});
			if (!result) throw new NotFoundException();
			return result;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async update(id: string, updateReviewDto: UpdateReviewDto) {
		try {
			const product = await Product.findOneBy({
				id: updateReviewDto.productId,
			});

			delete updateReviewDto.productId;
			const oldData = await this.reviewRepos.findOneBy({ id });

			return this.reviewRepos.save({
				...oldData,
				...updateReviewDto,
				product,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		try {
			await this.reviewRepos.delete(id);
			const review: Review = await this.reviewRepos.findOne({
				where: { id },
			});
			return new ResponseItem<Review>(review, 'delete success');
		} catch (error) {
			throw new BadRequestException(error.mess);
		}
	}
}
