import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoggerService } from '../../../logger/logger.service';
import { IRefreshOddsEventResponse } from '../entities/refresh-odds-connector.entities';
import { callAsyncWithRetry } from '../../../helpers/axios-with-retry';

@Injectable()
export class RefreshOddsConnectorApi {
  private apiKey = process.env.ODDS_API_KEY;

  constructor(private loggerService: LoggerService) {}

  async getLiveUpcomingOdds(): Promise<IRefreshOddsEventResponse[]> {
    try {
      const res = await callAsyncWithRetry(() => {
        return axios.get<IRefreshOddsEventResponse[]>(
          'https://api.the-odds-api.com/v4/sports/upcoming/odds',
          {
            params: {
              apiKey: this.apiKey,
              regions: 'us',
              markets: 'h2h',
              oddsFormat: 'decimal',
              dateFormat: 'iso',
            },
          },
        );
      });
      if (!res?.data) {
        throw new Error('Empty response from odds');
      }
      return res?.data;
    } catch (err) {
      this.loggerService.error('Error getting Live and Upcoming odds');
      throw err;
    }
  }
}
