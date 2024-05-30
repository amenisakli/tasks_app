import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Todo application')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use(express.static(join(__dirname, '..', 'client', 'dist', 'todo app')));
  app.use((req, res, next) => {
    res.sendFile(
      join(__dirname, '..', 'client', 'dist', 'todo app', 'index.html'),
    );
  });

  await app.listen(3000);
}
bootstrap();
