import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Variant } from '../../variant/entities/variant.entity';

@Entity()
export class Size extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	size: string;

	@OneToMany(() => Variant, (variant) => variant.size)
	variant: Variant[];
}
