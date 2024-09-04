import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatabaseSeeder } from './database.seeder';
import { HttpExceptionFilter } from './http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // This adds /api to all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  const seeder = app.get(DatabaseSeeder);
  app.enableCors({
    origin: 'http://localhost',
    credentials: true,
  });
  await seeder.seed();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
