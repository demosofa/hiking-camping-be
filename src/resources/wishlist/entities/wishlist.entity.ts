import { Product } from '@resources/product/entities/product.entity';
import { User } from '@resources/user/entities/user.entity';
import {
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToMany(() => Product, (product) => product.wishlists)
	@JoinTable()
	products: Product[];

	@OneToOne(() => User, (user) => user.wishlist)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
