import { User } from '@resources/user/entities/user.entity';
import { Variant } from '@resources/variant/entities/variant.entity';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	quantity: number;

	@Column()
	itemPrice: number;

	@Column()
	image: string;

	@Column()
	nameCart: string;

	@ManyToOne(() => User, (user) => user.cartItem)
	userId: User;

	@ManyToOne(() => Variant, (variant) => variant.cartItem)
	variantId: Variant;

	@DeleteDateColumn()
	@Exclude()
	deletedAt: Date;

	@CreateDateColumn()
	@Exclude()
	createdAt: Date;
}
