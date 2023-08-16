import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartItem } from './entities/cart_item.entity';
import { ColorModule } from '@resources/color/color.module';
import { SizeModule } from '@resources/size/size.module';
import { VariantModule } from '@resources/variant/variant.module';
import { VariantService } from '@resources/variant/variant.service';
import { UserModule } from '@resources/user/user.module';
import { UserService } from '@resources/user/user.service';
import { User } from '@resources/user/entities/user.entity';
import { Role } from '@resources/role/entities/role.entity';
import { RoleModule } from '@resources/role/role.module';
import { ProductModule } from '../product/product.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CartItem, User, Role]),
		RoleModule,
		UserModule,
		VariantModule,
		ColorModule,
		SizeModule,
		ProductModule,
	],
	controllers: [CartItemController],
	providers: [CartItemService, VariantService, UserService],
})
export class CartItemModule {}
