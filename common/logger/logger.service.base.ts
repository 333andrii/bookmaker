import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerServiceBase extends LoggerService {
  info(infoMessage: string, params?: Record<string, any>) {
    console.log(infoMessage, params);
  }

  error(errorMessage: string, params?: Record<string, any>) {
    console.log(errorMessage, params);
  }

  warn(warnMessage: string, params?: Record<string, any>) {
    console.log(warnMessage, params);
  }
}
