import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MicroserviceEvents } from '../../../common/event-adapter/event-adapter.entities';
import { GSheetFacade } from './g-sheet.facade';

@Controller()
export class GSheetController {
  constructor(private gSheetFacade: GSheetFacade) {}

  @EventPattern(MicroserviceEvents.MarketBookIsUpdated)
  async onMarketBookUpdate(): Promise<void> {
    await this.gSheetFacade.onMarketBookUpdated();
  }

  @EventPattern(MicroserviceEvents.BetsUpdated)
  async onBetsUpdated(): Promise<void> {
    await this.gSheetFacade.onBetsUpdated();
  }
}
