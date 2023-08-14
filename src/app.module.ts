import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DbConfig, JwtConfig } from 'config';
import { AuthModule } from '@resources/auth/auth.module';
import { RoleModule } from '@resources/role/role.module';
import { UserModule } from '@resources/user/user.module';
import { VariantModule } from './resources/variant/variant.module';
import { ColorModule } from './resources/color/color.module';
import { SizeModule } from './resources/size/size.module';
import { ProductModule } from '@resources/product/product.module';
import { CategoryModule } from '@resources/category/category.module';
import { ReviewModule } from '@resources/review/review.module';
import { CartItemModule } from '@resources/cart_item/cart_item.module';
import { WishlistModule } from './resources/wishlist/wishlist.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		DbConfig,
		JwtConfig,
		RoleModule,
		UserModule,
		AuthModule,
		VariantModule,
		ColorModule,
		SizeModule,
		ProductModule,
		CategoryModule,
		ReviewModule,
		CartItemModule,
		WishlistModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {}
