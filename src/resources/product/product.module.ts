import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@resources/role/entities/role.entity';
import { Product } from './entities/product.entity';
import { User } from '@resources/user/entities/user.entity';
import { UserModule } from '@resources/user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([User, Role, Product]), UserModule],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
