import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('cribb-api')
    .setDescription('Real Estate Management System')
    .addBearerAuth()
    .setVersion('1.0.0')
    .setContact(
      'Cribb',
      '#',
      'stevepathagoras08@gmail.com',
    )
    .addTag('EndPoints')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const swaggerCustomOptions : SwaggerCustomOptions = {
    customSiteTitle: 'Cribb Api',
    swaggerOptions: {
      persistAuthorization: true,
    }
  } 
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  app.enableCors()

  // app.useStaticAssets(join(__dirname, '..', 'public'))
  // app.setViewEngine('ejs')
  // app.setBaseViewsDir(join(__dirname, '..', 'views'))
  await app.listen(process.env.PORT || 9090, callback);
}
bootstrap();

function callback (){
  console.log(`Server is running on port: ${process.env.PORT || 9090}`)
}
