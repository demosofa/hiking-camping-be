import { CartItem } from '@resources/cart_item/entities/cart_item.entity';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	totalPrice: number;

	@OneToMany(() => CartItem, (cart_item) => cart_item.cartId)
	cartItem: CartItem[];

	@DeleteDateColumn()
	@Exclude()
	deletedAt: Date;

	@CreateDateColumn()
	@Exclude()
	createdAt: Date;
}
