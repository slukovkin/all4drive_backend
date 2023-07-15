import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 5500;
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle('Система учета товаров')
    .setDescription('Документация по API')
    .setVersion('1.0.0')
    .addTag('ALL4DRIVE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
