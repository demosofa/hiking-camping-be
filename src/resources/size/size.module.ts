import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { Role } from '@resources/role/entities/role.entity';
import { RoleModule } from '@resources/role/role.module';
import { User } from '@resources/user/entities/user.entity';
import { UserModule } from '@resources/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Role, User]), RoleModule, UserModule],
	controllers: [SizeController],
	providers: [SizeService],
	exports: [SizeService],
})
export class SizeModule {}
