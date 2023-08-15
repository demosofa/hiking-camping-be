import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	rating: number;

	@IsNotEmpty()
	@IsString()
	review_title: string;

	@IsNotEmpty()
	@IsString()
	review_body: string;

	@IsOptional()
	@IsString()
	productId: string;
}
