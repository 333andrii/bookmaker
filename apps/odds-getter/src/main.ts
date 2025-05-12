import { NestFactory } from '@nestjs/core';
import { OddsGetterModule } from './odds-getter.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OddsGetterModule,
    {
      transport: Transport.REDIS,
      options: {
        name: process.env.REDIS_CLIENT_NAME as string,
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string),
      },
    },
  );
  await app.listen();
}
bootstrap();
