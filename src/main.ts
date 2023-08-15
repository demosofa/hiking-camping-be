import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DeleteInterceptor } from '@common/interceptors/delete.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(helmet());
	app.enableCors();
	app.useGlobalInterceptors(new DeleteInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			validationError: { target: false },
		})
	);
	app.useStaticAssets(join(__dirname, '..', 'upload'), {
		index: false,
		prefix: '/upload',
	});

	await app.listen(3000);
}
bootstrap();
