import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BetType } from './market.entities';

@Entity()
export class BetDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marketId: number;

  @Column('float')
  stake: number;

  @Column({ default: false })
  settled: boolean;

  @Column('float', { nullable: true })
  pnl: number;

  @Column({
    type: 'enum',
    enum: BetType,
    nullable: false,
  })
  betType: BetType;

  @Column('float')
  price: number;

  static toBetDto(bet: BetDbEntity): BetDto {
    const { id, marketId, settled, stake, pnl, betType, price } = bet;
    return { id, marketId, settled, stake, pnl, betType, price };
  }
}

export interface BetDto {
  id: number;
  marketId: number;
  stake: number;
  settled: boolean;
  pnl: number;
  betType: BetType;
  price: number;
}
