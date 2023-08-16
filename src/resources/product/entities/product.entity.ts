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
import { Variant } from '../../variant/entities/variant.entity';

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

	@OneToMany(() => Variant, (variant) => variant.product)
	variant: Variant[];

	@ManyToMany(() => Wishlist, (wishlist) => wishlist.products)
	wishlists: Wishlist[];
}
