import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetModifier } from './services/google-spreadsheet.modifier';
import { DbBookmakerService } from '../../../common/db-bookmaker/services/db-bookmaker.service';

@Injectable()
export class GSheetFacade {
  constructor(
    private googleSpreadsheetModifier: GoogleSpreadsheetModifier,
    private dbBookmakerService: DbBookmakerService,
  ) {}

  async onMarketBookUpdated(): Promise<void> {
    const markets = await this.dbBookmakerService.getOpenMarkets();
    await this.googleSpreadsheetModifier.updateMarketBook(markets);
  }

  async onBetsUpdated(): Promise<void> {
    const bets = await this.dbBookmakerService.getAllBets();
    await this.googleSpreadsheetModifier.updateBets(bets);
  }
}
