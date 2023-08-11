import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { VoidInterceptor } from '@common/interceptors/void.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

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

	await app.listen(3000);
}
bootstrap();
