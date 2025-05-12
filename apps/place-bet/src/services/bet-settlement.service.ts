import { Injectable } from '@nestjs/common';
import { BetDbEntity } from '../../../../common/entities/bet.dto';
import { LoggerService } from '../../../../common/logger/logger.service';
import { DbBookmakerService } from '../../../../common/db-bookmaker/services/db-bookmaker.service';
import { EventEmitterAdapter } from '../../../../common/event-adapter/event-emitter-adapter.service';
import { MarketDbEntity } from '../../../../common/entities/market.dto';
import {
  BetType,
  MarketStatusType,
} from '../../../../common/entities/market.entities';

@Injectable()
export class BetSettlementService {
  constructor(
    private logger: LoggerService,
    private dbBookmakerService: DbBookmakerService,
  ) {}

  async runBetSettlement(): Promise<void> {
    try {
      //of course that could be analyzed and optimized, at least to create a particular query
      const openBets = await this.dbBookmakerService.getOpenBets();

      const settlementPromises = openBets.map((bet) => this.settleBet(bet));
      await Promise.all(settlementPromises);
    } catch (err) {
      this.logger.error('Error when processing settlement', { error: err });
      throw err;
    }
  }

  async settleBet(bet: BetDbEntity): Promise<void> {
    try {
      const market = await this.dbBookmakerService.getMarketById(bet.marketId);
      if (!market) {
        throw new Error(
          `Market is absent for marketID ${bet.marketId} and for bet id: ${bet.id}`,
        );
      }

      if (market.marketStatus === MarketStatusType.Finished) {
        await this.dbBookmakerService.settleBet(
          bet.id,
          this.calculatePnl(bet, market),
        );
      }
    } catch (err) {
      this.logger.error('Error when settle bet', { error: err, betId: bet.id });
    }
  }

  private calculatePnl(bet: BetDbEntity, market: MarketDbEntity): number {
    const stake = bet.stake;
    const betType = bet.betType;

    const possibleResults: ('Back' | 'Lay' | 'Draw')[] = [
      'Back',
      'Lay',
      'Draw',
    ];
    const result =
      possibleResults[Math.floor(Math.random() * possibleResults.length)];

    if (betType === result) {
      let odds: number;
      switch (betType) {
        case BetType.Back:
          odds = market.priceBack;
          break;
        case BetType.Lay:
          odds = market.priceLay;
          break;
        case BetType.Draw:
          odds = market.priceDraw;
          break;
        default:
          throw new Error(`Invalid bet type: ${betType as string}`);
      }

      return +(stake * (odds - 1)).toFixed(2);
    } else {
      return -stake;
    }
  }
}
