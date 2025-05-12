import { Injectable } from '@nestjs/common';
import { IPlaceBetParams } from '../entities/place-bet.entities';

@Injectable()
export abstract class EventEmitterAdapter {
  abstract marketBookUpdated(): void;
  abstract updateMarketBook(): void;
  abstract placeBet(bet: IPlaceBetParams): void;

  abstract betsUpdated(): void;
  abstract settleBet(): void;
}
