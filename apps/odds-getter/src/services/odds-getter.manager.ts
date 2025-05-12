import { Injectable } from '@nestjs/common';
import { OddsGetterStatusService } from './odds-getter-status.service';
import { EventEmitterAdapter } from '../../../../common/event-adapter/event-emitter-adapter.service';
import { LoggerService } from '../../../../common/logger/logger.service';
import { OddsGetterApiService } from './odds-getter-api.service';
import { DbBookmakerService } from '../../../../common/db-bookmaker/services/db-bookmaker.service';

@Injectable()
export class OddsGetterManager {
  constructor(
    private oddsManagerStatus: OddsGetterStatusService,
    private eventEmitter: EventEmitterAdapter,
    private oddsGetterApi: OddsGetterApiService,
    private dbBookmakerService: DbBookmakerService,
    private logger: LoggerService,
  ) {}

  async refreshOdds(): Promise<void> {
    this.oddsManagerStatus.runStart();

    try {
      const markets = await this.oddsGetterApi.getOdds();
      await this.dbBookmakerService.updateMarkets(markets);
      await this.dbBookmakerService.finishOldMarkets();
      this.eventEmitter.marketBookUpdated();
      this.oddsManagerStatus.runEnd();
    } catch (err) {
      this.oddsManagerStatus.runFailed();
      this.logger.error('Error when refreshing odds in odds-manager', {
        error: err,
      });
    }
  }
}
