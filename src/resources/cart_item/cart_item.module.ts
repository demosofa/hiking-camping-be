import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartModule } from '@resources/carts/cart.module';
import { VariantModule } from '@resources/variant/variant.module';
import { CartService } from '@resources/carts/cart.service';
import { VariantService } from '@resources/variant/variant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { Cart } from '@resources/carts/entities/cart.entity';
import { ColorModule } from '@resources/color/color.module';
import { SizeModule } from '@resources/size/size.module';
import { ColorService } from '@resources/color/color.service';
import { SizeService } from '@resources/size/size.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([CartItem, Cart]),
		CartModule,
		VariantModule,
		ColorModule,
		SizeModule,
	],
	controllers: [CartItemController],
	providers: [
		CartItemService,
		CartService,
		VariantService,
		ColorService,
		SizeService,
	],
})
export class CartItemModule {}
