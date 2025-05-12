import { Injectable } from '@nestjs/common';
import { IRefreshOddsEventResponse } from '../entities/refresh-odds-connector.entities';
import { LoggerService } from '../../../logger/logger.service';
import { RefreshOddsConnectorApi } from './refresh-odds-connector.api';

@Injectable()
export class RefreshOddsConnector {
  constructor(
    private logger: LoggerService,
    private refreshOddsApi: RefreshOddsConnectorApi,
  ) {}

  async refreshOdds(): Promise<IRefreshOddsEventResponse[]> {
    try {
      return await this.refreshOddsApi.getLiveUpcomingOdds();
    } catch (err) {
      this.logger.error('Error when refreshing odds in refresh odds connector');
      throw err;
    }
  }
}
