import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { ColorModule } from '../color/color.module';
import { SizeModule } from '../size/size.module';
import { ColorService } from '../color/color.service';
import { SizeService } from '../size/size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { MulterConfigModule } from '../../config/multerConfig.module';
import { Role } from '@resources/role/entities/role.entity';
import { User } from '@resources/user/entities/user.entity';
import { RoleModule } from '@resources/role/role.module';
import { UserModule } from '@resources/user/user.module';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Variant, Role, User]),
		RoleModule,
		UserModule,
		ColorModule,
		SizeModule,
		ProductModule,
		TypeOrmModule.forFeature([Variant]),
		MulterConfigModule,
	],
	controllers: [VariantController],
	providers: [VariantService, ColorService, SizeService, ProductService],
	exports: [VariantService],
})
export class VariantModule {}
