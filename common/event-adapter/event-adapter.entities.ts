//this contains list of all available events microservices collaborating with
import { IMarketBook } from '../entities/market.entities';
import { IPlaceBetParams } from '../entities/place-bet.entities';

export interface IMicroserviceEventMap {
  [MicroserviceEvents.MarketBookIsUpdated]: { data: true };
  [MicroserviceEvents.MarketBookUpdate]: { data: true };
  [MicroserviceEvents.PlaceBetCreate]: { data: IPlaceBetParams };
  [MicroserviceEvents.BetsUpdated]: { data: true };
  [MicroserviceEvents.PlaceBetSettled]: { data: true };
}

export enum MicroserviceEvents {
  MarketBookUpdate = 'marketBook.update',
  MarketBookIsUpdated = 'marketBook.isUpdated',
  PlaceBetCreate = 'placeBet.create',
  BetsUpdated = 'placeBet.betsUpdated',
  PlaceBetSettled = 'placeBet.settled',
}

export interface IMarketBookUpdateEventData {
  marketBook: IMarketBook;
}
