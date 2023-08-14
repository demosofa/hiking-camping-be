import { Category } from '@resources/category/entities/category.entity';
import { Review } from '@resources/review/entities/review.entity';
import { Wishlist } from '@resources/wishlist/entities/wishlist.entity';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	vender: string;

	@Column()
	description: string;

	@ManyToOne(() => Category, (category) => category.product)
	category: Category;

	@OneToMany(() => Review, (review) => review.product)
	review: Review[];

	@ManyToMany(() => Wishlist, (wishlist) => wishlist.products)
	wishlists: Wishlist[];
}
