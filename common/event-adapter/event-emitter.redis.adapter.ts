import { Inject, Injectable } from '@nestjs/common';
import { EventEmitterAdapter } from './event-emitter-adapter.service';
import {
  IMicroserviceEventMap,
  MicroserviceEvents,
} from './event-adapter.entities';
import { ClientProxy } from '@nestjs/microservices';
import { IPlaceBetParams } from '../entities/place-bet.entities';

@Injectable()
export class EventEmitterRedisAdapter extends EventEmitterAdapter {
  private _client: {
    emit<T extends MicroserviceEvents>(
      eventName: T,
      data: IMicroserviceEventMap[T],
    ): any;
  } | null;

  constructor(
    @Inject('REDIS_CLIENT')
    private redisClient: ClientProxy<IMicroserviceEventMap>,
  ) {
    super();
    this._client = redisClient;
  }

  updateMarketBook(): void {
    this._client?.emit<MicroserviceEvents.MarketBookUpdate>(
      MicroserviceEvents.MarketBookUpdate,
      { data: true },
    );
  }

  placeBet(bet: IPlaceBetParams): void {
    this._client?.emit<MicroserviceEvents.PlaceBetCreate>(
      MicroserviceEvents.PlaceBetCreate,
      { data: bet },
    );
  }

  settleBet(): void {
    this._client?.emit<MicroserviceEvents.PlaceBetSettled>(
      MicroserviceEvents.PlaceBetSettled,
      { data: true },
    );
  }

  betsUpdated() {
    this._client?.emit<MicroserviceEvents.BetsUpdated>(
      MicroserviceEvents.BetsUpdated,
      { data: true },
    );
  }

  marketBookUpdated() {
    this._client?.emit<MicroserviceEvents.MarketBookIsUpdated>(
      MicroserviceEvents.MarketBookIsUpdated,
      { data: true },
    );
  }
}
