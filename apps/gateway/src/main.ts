import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3333, '0.0.0.0');
}

bootstrap();
