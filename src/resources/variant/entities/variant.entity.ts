import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../../color/entities/color.entity';
import { Size } from '../../size/entities/size.entity';

@Entity()
export class Variant extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	stock: number;

	@ManyToOne(() => Color, (color) => color.variant)
	color: Color;

	@ManyToOne(() => Size, (size) => size.variant)
	size: Size;

	@Column()
	price: number;
}
