import { Injectable } from '@nestjs/common';
import { IPlaceBetParams } from '../../../common/entities/place-bet.entities';
import { EventEmitterAdapter } from '../../../common/event-adapter/event-emitter-adapter.service';

@Injectable()
export class GatewayFacade {
  constructor(private eventAdapter: EventEmitterAdapter) {}

  placeBet(placeBet: IPlaceBetParams): void {
    this.eventAdapter.placeBet(placeBet);
  }

  updateOddsBook(): void {
    this.eventAdapter.updateMarketBook();
  }
}
