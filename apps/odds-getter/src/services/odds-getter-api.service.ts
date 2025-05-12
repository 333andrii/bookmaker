import { Injectable } from '@nestjs/common';
import { RefreshOddsConnector } from '../../../../common/connectors/refresh-odds/services/refresh-odds.connector';
import { MarketDto } from '../../../../common/entities/market.dto';
import { OddsGetterTransformService } from './odds-getter-transform.service';
import { LoggerService } from '../../../../common/logger/logger.service';

@Injectable()
export class OddsGetterApiService {
  constructor(
    private refreshOddConnector: RefreshOddsConnector,
    private oddsGetterTransformService: OddsGetterTransformService,
    private logger: LoggerService,
  ) {}

  async getOdds(): Promise<Omit<MarketDto, 'id'>[]> {
    try {
      const connectorEvents = await this.refreshOddConnector.refreshOdds();
      return connectorEvents.flatMap((event) => {
        const newMarkets =
          this.oddsGetterTransformService.transformConnectorEvent(event);
        return newMarkets ? newMarkets : [];
      });
    } catch (err) {
      this.logger.error(
        'Error when getting odds from connector and transforming',
        { error: err },
      );
      throw err;
    }
  }
}
