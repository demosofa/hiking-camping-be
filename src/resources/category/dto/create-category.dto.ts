import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	category: string;

	@IsOptional()
	@IsString()
	image: string;

	@IsOptional()
	@IsUUID()
	parentCategoryId: string;
}
