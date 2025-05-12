import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerServiceBase } from './logger.service.base';

@Module({})
export class LoggerModule {
  static withAdapter(
    loggerService?: new (...args: any[]) => LoggerService,
  ): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useClass: loggerService || LoggerServiceBase,
        },
      ],
      exports: [LoggerService],
    };
  }
}
