import { Controller } from '@nestjs/common';
import { OddsGetterFacade } from './odds-getter.facade';
import { EventPattern } from '@nestjs/microservices';
import { MicroserviceEvents } from '../../../common/event-adapter/event-adapter.entities';

@Controller()
export class OddsGetterController {
  constructor(private oddsGetterFacade: OddsGetterFacade) {}

  //in easy way you can run cron jobs refreshing odds
  /*@Cron('*!/10 * * * * *')*/
  @EventPattern(MicroserviceEvents.MarketBookUpdate)
  async refreshOdds() {
    await this.oddsGetterFacade.refreshOdds();
  }
}
