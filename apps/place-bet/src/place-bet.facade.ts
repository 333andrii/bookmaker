import { Injectable } from '@nestjs/common';
import { IPlaceBetParams } from '../../../common/entities/place-bet.entities';
import { PlaceBetService } from './services/place-bet.service';
import { EventEmitterAdapter } from '../../../common/event-adapter/event-emitter-adapter.service';
import { LoggerService } from '../../../common/logger/logger.service';
import { BetSettlementService } from './services/bet-settlement.service';
import { DbBookmakerService } from '../../../common/db-bookmaker/services/db-bookmaker.service';

@Injectable()
export class PlaceBetFacade {
  constructor(
    private placeBetService: PlaceBetService,
    private betSettlementService: BetSettlementService,
    private eventEmitterAdapter: EventEmitterAdapter,
    private dbBookmakerService: DbBookmakerService,
    private logger: LoggerService,
  ) {}

  async placeBet(bet: IPlaceBetParams): Promise<void> {
    try {
      await this.placeBetService.placeBet(bet);
      this.eventEmitterAdapter.betsUpdated();

      setTimeout(async () => {
        await this.dbBookmakerService.setMarketFinished(bet.marketId);
        await this.runBetSettlement();

        //I need to inform there are changes in bets and markets as well
        this.eventEmitterAdapter.betsUpdated();
        this.eventEmitterAdapter.marketBookUpdated();
      }, 60000);
    } catch (err) {
      this.logger.error('Error when placing bet', { error: err });
      throw err;
    }
  }

  async runBetSettlement(): Promise<void> {
    try {
      await this.betSettlementService.runBetSettlement();
    } catch (err) {
      this.logger.error('Error when running settlement', { error: err });
      throw err;
    }
  }
}
