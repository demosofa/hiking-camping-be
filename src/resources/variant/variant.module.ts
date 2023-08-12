import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { ColorModule } from '../color/color.module';
import { SizeModule } from '../size/size.module';
import { ColorService } from '../color/color.service';
import { SizeService } from '../size/size.service';

@Module({
	imports: [ColorModule, SizeModule],
	controllers: [VariantController],
	providers: [VariantService, ColorService, SizeService],
})
export class VariantModule {}
