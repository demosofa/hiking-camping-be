import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart_item.dto';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}
