import { MarketDto } from './market.dto';

export type IMarketBook = MarketDto[];

export enum MarketStatusType {
  Finished = 'Finished',
  Open = 'Open',
}

export enum BetType {
  Back = 'Back',
  Lay = 'Lay',
  Draw = 'Draw',
}

export enum BetStatusType {
  Placed = 'Placed',
  Settled = 'Settled',
}
