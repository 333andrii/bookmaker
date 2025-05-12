import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetClient } from './google-spreadsheet.client';
import { GoogleSheetName } from '../constants/google-spreadsheet.constants';
import { MarketDto } from '../../../../common/entities/market.dto';

@Injectable()
export class GoogleSpreadsheetModifier {
  constructor(private googleSpreadsheetClient: GoogleSpreadsheetClient) {}

  async updateMarketBook(markets: MarketDto[]): Promise<void> {
    markets.sort((a, b) => {
      return a.marketName > b.marketName ? -1 : 1;
    });

    await this.googleSpreadsheetClient.updateSheet(
      GoogleSheetName.MarketBook,
      'A1',
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
}
