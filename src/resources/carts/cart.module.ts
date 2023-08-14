import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Role } from '@resources/role/entities/role.entity';
import { User } from '@resources/user/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Role, Cart])],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService],
})
export class CartModule {}
