import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Template for NestJS and MongoDB')
    .setDescription('The template for NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new MongoExceptionFilter());
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
