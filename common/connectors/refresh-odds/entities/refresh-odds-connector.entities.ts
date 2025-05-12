export interface IRefreshOddsEventResponse {
  id: string;
  sport_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: IRefreshOddsBookmakerResponse[];
}

export interface IRefreshOddsBookmakerResponse {
  key: string;
  title: string;
  last_update: string;
  markets: IRefreshOddsMarketEntityResponse[];
}

export interface IRefreshOddsMarketEntityResponse {
  key: string;
  outcomes: {
    name: string;
    price: number;
  }[];
}
