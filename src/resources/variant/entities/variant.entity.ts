import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../../color/entities/color.entity';
import { Size } from '../../size/entities/size.entity';
import { Product } from '../../product/entities/product.entity';
import { CartItem } from '@resources/cart_item/entities/cart_item.entity';

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

	@OneToMany(() => CartItem, (cart_item) => cart_item.variantId)
	cartItem: CartItem[];

	@Column()
	price: number;

	@ManyToOne(() => Product, (product) => product.variant)
	product: Product;

	@Column()
	image: string;
}
