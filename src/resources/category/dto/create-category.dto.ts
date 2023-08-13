import { Type } from 'class-transformer';
import {
	IsEmpty,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator';

export class CreateCategoryDto {
	@IsNotEmpty()
	category: string;

	@IsNotEmpty()
	image: string;

	@IsEmpty()
	parentCategoryId: string;
}
