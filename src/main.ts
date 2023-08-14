import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { VoidInterceptor } from '@common/interceptors/void.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(helmet());
	app.enableCors();
	app.useGlobalInterceptors(new VoidInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			validationError: { target: false },
		})
	);
	app.useStaticAssets(join(__dirname, '..', 'public'), {
		index: false,
		prefix: '/public',
	});

	await app.listen(3000);
}
bootstrap();
