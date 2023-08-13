import { Product } from '@resources/product/entities/product.entity';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Review extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	rating: number;

	@Column()
	review_title: string;

	@Column()
	review_body: string;

	@ManyToOne(() => Product, (product) => product.review)
	product: Product;
}
