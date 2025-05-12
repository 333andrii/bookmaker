import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterAdapter } from './event-emitter-adapter.service';
import { EventEmitterRedisAdapter } from './event-emitter.redis.adapter';

@Module({})
export class EventAdapterModule {
  //here is possible to extend with parameters and specify how that module will work in every service
  //e.g. which IP for redis client and in general maybe to use completely the other transport
  static forTransport(): DynamicModule {
    return {
      module: EventAdapterModule,
      imports: [
        ClientsModule.register([
          {
            name: process.env.REDIS_CLIENT_NAME as string,
            transport: Transport.REDIS,
            options: {
              host: process.env.REDIS_HOST as string,
              port: parseInt(process.env.REDIS_PORT as string),
            },
          },
        ]),
      ],
      providers: [
        {
          provide: EventEmitterAdapter,
          useClass: EventEmitterRedisAdapter,
        },
      ],
      exports: [EventEmitterAdapter],
    };
  }
}
