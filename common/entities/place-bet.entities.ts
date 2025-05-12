import { BetType } from './market.entities';

export interface IPlaceBetParams {
  marketId: number;
  price: number;
  stake: number;
  betType: BetType;
}
