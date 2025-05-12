import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  IMicroserviceEventMap,
  MicroserviceEvents,
} from '../../../common/event-adapter/event-adapter.entities';
import { PlaceBetFacade } from './place-bet.facade';
import { LoggerService } from '../../../common/logger/logger.service';

@Controller()
export class PlaceBetController {
  constructor(
    private placeBetFacade: PlaceBetFacade,
    private logger: LoggerService,
  ) {}

  @EventPattern(MicroserviceEvents.MarketBookIsUpdated)
  async onMarketBookUpdate(): Promise<void> {
    try {
      await this.placeBetFacade.runBetSettlement();
    } catch (err) {
      this.logger.error('Error when refreshing market book', { error: err });
    }
  }

  @EventPattern(MicroserviceEvents.PlaceBetCreate)
  async placeBet(
    @Payload() data: IMicroserviceEventMap[MicroserviceEvents.PlaceBetCreate],
  ) {
    try {
      console.log('Place bet');
      await this.placeBetFacade.placeBet(data.data);
    } catch (err) {
      this.logger.error('Error when placing bet in place bet controller', {
        error: err,
      });
    }
  }
}
