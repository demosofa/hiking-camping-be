import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@resources/role/entities/role.entity';
import { User } from '@resources/user/entities/user.entity';
import { RoleModule } from '@resources/role/role.module';
import { UserModule } from '@resources/user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Role, User]), RoleModule, UserModule],
	controllers: [ColorController],
	providers: [ColorService],
	exports: [ColorService],
})
export class ColorModule {}
