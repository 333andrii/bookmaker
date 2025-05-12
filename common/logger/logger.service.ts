import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class LoggerService {
  abstract error(errorMessage: string, params?: Record<string, any>): void;

  abstract warn(warnMessage: string, params?: Record<string, any>): void;

  abstract info(infoMessage: string, params?: Record<string, any>): void;
}
