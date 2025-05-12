import { Module } from '@nestjs/common';
import { EventAdapterModule } from '../../../common/event-adapter/event-adapter.module';
import { LoggerModule } from '../../../common/logger/logger.module';
import * as dotenv from 'dotenv';
import { GatewayController } from './gateway.controller';
import { GatewayFacade } from './gateway.facade';
dotenv.config();

@Module({
  //here is possible to extend with factory to specify the Redis client IP or any other transports
  imports: [
    EventAdapterModule.forTransport(),
    LoggerModule.withAdapter() /*each microservice may have it's own logger*/,
  ],
  providers: [GatewayFacade],
  controllers: [GatewayController],
})
export class GatewayModule {}
