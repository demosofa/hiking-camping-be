import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { MulterConfigModule } from '@config/multerConfig.module';
import { Role } from '@resources/role/entities/role.entity';
import { User } from '@resources/user/entities/user.entity';
import { RoleModule } from '@resources/role/role.module';
import { UserModule } from '@resources/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Category, Role, User]),
		MulterConfigModule,
		RoleModule,
		UserModule,
	],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class CategoryModule {}
