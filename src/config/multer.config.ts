import { HttpException, HttpStatus } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = registerAs(
	'multerConfig',
	(): MulterOptions => ({
		storage: diskStorage({
			destination: './public',
			filename(req, file, callback) {
				return callback(null, `${Date.now()}.${extname(file.originalname)}`);
			},
		}),
		fileFilter(req, file, callback) {
			if (file.mimetype.match(/jpeg|jpg|png|gif/)) callback(null, true);
			else
				callback(
					new HttpException(
						`Unsupported file type ${extname(file.originalname)}`,
						HttpStatus.UNPROCESSABLE_ENTITY
					),
					false
				);
		},
	})
);
