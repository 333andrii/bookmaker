import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MarketStatusType } from './market.entities';

@Entity()
export class MarketDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  eventId: string;

  @Column('varchar')
  providerKey: string;

  @Column('varchar')
  marketKey: string;

  @Column('varchar')
  providerName: string;

  @Column('float')
  priceBack: number;

  @Column('float')
  priceDraw: number;

  @Column('varchar')
  marketName: string;

  @Column('float')
  priceLay: number;

  @Column({
    type: 'enum',
    enum: MarketStatusType,
    nullable: false,
    default: MarketStatusType.Open,
  })
  marketStatus: MarketStatusType;

  @Column('timestamp')
  startingTime: Date;

  @Column('varchar')
  sportKey: string;

  static toMarketDto(market: MarketDbEntity): MarketDto {
    const {
      id,
      eventId,
      providerKey,
      marketKey,
      providerName,
      priceBack,
      priceLay,
      priceDraw,
      marketName,
      marketStatus,
      startingTime,
      sportKey,
    } = market;

    return {
      id,
      eventId,
      providerKey,
      marketKey,
      providerName,
      priceBack,
      priceLay,
      priceDraw,
      marketName,
      marketStatus,
      startingTime,
      sportKey,
    };
  }
}

export interface MarketDto {
  id: number;
  eventId: string;
  providerKey: string;
  sportKey: string;
  marketKey: string;
  providerName: string;
  priceBack: number;
  priceDraw: number;
  marketName: string;
  priceLay: number;
  marketStatus: MarketStatusType;
  startingTime: Date;
}
