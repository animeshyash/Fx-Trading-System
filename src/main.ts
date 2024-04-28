import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Forex Trading System')
    .setDescription(
      `This application implements several
    APIs that allow users to top up their account, fetch live FX conversion rates, perform
    FX conversions, and check their account balances.`,
    )
    .setVersion('1.0')
    .setBasePath('http://localhost:3000/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
