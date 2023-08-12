import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Variant } from '../../variant/entities/variant.entity';

@Entity()
export class Color extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	color: string;

	@OneToMany(() => Variant, (variant) => variant.color)
	variant: Variant[];
}
