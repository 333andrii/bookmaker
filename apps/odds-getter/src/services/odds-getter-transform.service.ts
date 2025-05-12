import { Injectable } from '@nestjs/common';
import {
  IRefreshOddsBookmakerResponse,
  IRefreshOddsEventResponse,
  IRefreshOddsMarketEntityResponse,
} from '../../../../common/connectors/refresh-odds/entities/refresh-odds-connector.entities';
import { MarketDto } from '../../../../common/entities/market.dto';
import { MarketStatusType } from '../../../../common/entities/market.entities';
import { LoggerService } from '../../../../common/logger/logger.service';

@Injectable()
export class OddsGetterTransformService {
  constructor(private logger: LoggerService) {}
  transformConnectorEvent(
    event: IRefreshOddsEventResponse,
  ): Omit<MarketDto, 'id'>[] | null {
    if (event?.bookmakers?.length) {
      const markets: Omit<MarketDto, 'id'>[] = [];
      event.bookmakers.forEach((bookmaker) => {
        if (bookmaker?.markets?.length) {
          bookmaker.markets.forEach((market) => {
            const transformedMarket = this._transformMarket(
              event,
              bookmaker,
              market,
            );
            if (transformedMarket) {
              markets.push(transformedMarket);
            }
          });
        }
      });
      return markets;
    }
    return null;
  }

  private _transformMarket(
    event: IRefreshOddsEventResponse,
    bookmaker: IRefreshOddsBookmakerResponse,
    market: IRefreshOddsMarketEntityResponse,
  ): Omit<MarketDto, 'id'> | null {
    try {
      let startingTime = new Date(event.commence_time);
      startingTime = isNaN(startingTime.getTime()) ? new Date() : startingTime;
      return {
        eventId: event.id,
        providerKey: bookmaker.key,
        sportKey: event.sport_key,
        marketKey: market.key,
        providerName: bookmaker.title,
        priceBack: market.outcomes[0].price || 0,
        priceLay: market.outcomes[1].price || 0,
        priceDraw: market.outcomes?.[2]?.price || 0,
        marketName: `${event.home_team} VS ${event.away_team}`,
        marketStatus: MarketStatusType.Open,
        startingTime,
      };
    } catch (err) {
      this.logger.error('Error transform market', {
        event,
        bookmaker,
        market,
      });
      return null;
    }
  }
}
