import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetClient } from './google-spreadsheet.client';
import { GoogleSheetName } from '../constants/google-spreadsheet.constants';
import { MarketDbEntity } from '../../../../common/entities/market.dto';
import { BetDbEntity } from '../../../../common/entities/bet.dto';

@Injectable()
export class GoogleSpreadsheetModifier {
  constructor(private googleSpreadsheetClient: GoogleSpreadsheetClient) {}

  async updateMarketBook(markets: MarketDbEntity[]): Promise<void> {
    markets.sort((a, b) => {
      return a.marketName > b.marketName ? -1 : 1;
    });

    await this.googleSpreadsheetClient.updateSheet(
      GoogleSheetName.MarketBook,
      'A2',
      markets.map((market) => {
        const {
          id,
          marketName,
          providerName,
          sportKey,
          priceBack,
          priceLay,
          priceDraw,
        } = market;
        return [
          marketName,
          providerName,
          sportKey,
          priceBack.toString(),
          priceLay.toString(),
          priceDraw.toString(),
          id.toString(),
        ];
      }),
    );
  }

  async updateBets(bets: BetDbEntity[]): Promise<void> {
    bets.sort((a, b) => {
      return a.settled < b.settled ? -1 : 1;
    });

    await this.googleSpreadsheetClient.updateSheet(
      GoogleSheetName.MyBets,
      'A2',
      bets.map((bet) => {
        const { id, marketId, stake, settled, price, pnl } = bet;
        return [
          id.toString(),
          marketId.toString(),
          stake?.toString(),
          settled ? 'Settled' : 'Open',
          price?.toString(),
          pnl?.toString(),
        ];
      }),
    );
  }
}
