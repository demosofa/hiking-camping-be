import { Product } from '@resources/product/entities/product.entity';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	category: string;

	@Column()
	image: string;

	@ManyToOne(() => Category, (category) => category.subCategories) // mối quan hệ nhiều-đến-một
	@JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
	parentCategory: Category;

	@OneToMany(() => Category, (category) => category.parentCategory) // mối quan hệ một-đến-nhiều
	subCategories: Category[];

	@OneToMany(() => Product, (product) => product.category)
	product: Product[];
}
