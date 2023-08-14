import { Module, forwardRef } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@resources/role/entities/role.entity';
import { User } from '@resources/user/entities/user.entity';
import { Product } from '@resources/product/entities/product.entity';
import { Wishlist } from './entities/wishlist.entity';
import { UserModule } from '@resources/user/user.module';
import { ProductModule } from '@resources/product/product.module';
import { UserService } from '@resources/user/user.service';
import { ProductService } from '@resources/product/product.service';
import { RoleModule } from '@resources/role/role.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Role, User, Product, Wishlist]),
		RoleModule,
		UserModule,
		ProductModule,
	],
	controllers: [WishlistController],
	providers: [WishlistService, UserService, ProductService],
	exports: [WishlistService],
})
export class WishlistModule {}
