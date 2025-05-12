import * as dotenv from 'dotenv';
dotenv.config();
export const GoogleSheetName = {
  MarketBook: process.env.GOOGLE_MARKET_BOOK_SHEET_NAME as string,
  MyBets: process.env.GOOGLE_MY_BETS_SHEET_NAME as string,
  PlaceBet: process.env.GOOGLE_PLACE_BET_SHEET_NAME as string,
};

export type GoogleSheetName =
  (typeof GoogleSheetName)[keyof typeof GoogleSheetName];
