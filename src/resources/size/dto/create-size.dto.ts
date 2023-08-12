import { IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
	@IsNotEmpty()
	size: string;
}
