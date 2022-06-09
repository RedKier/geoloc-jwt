import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (CONFIG.APP.IS_DEVELOPMENT) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

    const swaggerOptions = new DocumentBuilder()
      .setTitle('Geo location api with jwt')
      .setVersion('1.0')
      .setDescription('Geo location API documentation')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, document);
  }
  
  app.disable('x-powered-by');


  await app.listen(CONFIG.APP.PORT);
}
bootstrap();
