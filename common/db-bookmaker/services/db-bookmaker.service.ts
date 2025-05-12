import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { MarketDbEntity, MarketDto } from '../../entities/market.dto';
import { BetDbEntity } from '../../entities/bet.dto';
import { BetType, MarketStatusType } from '../../entities/market.entities';

@Injectable()
export class DbBookmakerService {
  constructor(
    @InjectRepository(MarketDbEntity)
    private marketRepo: Repository<MarketDbEntity>,
    @InjectRepository(BetDbEntity)
    private betRepo: Repository<BetDbEntity>,
  ) {}

  async updateMarkets(freshMarkets: Omit<MarketDto, 'id'>[]): Promise<void> {
    for (const freshMarket of freshMarkets) {
      const existingMarket = await this.marketRepo.findOne({
        where: {
          eventId: freshMarket.eventId,
          providerKey: freshMarket.providerKey,
          marketKey: freshMarket.marketKey,
        },
      });

      if (existingMarket) {
        if (existingMarket.marketStatus === MarketStatusType.Finished) {
          continue;
        }

        existingMarket.priceBack = freshMarket.priceBack;
        existingMarket.priceLay = freshMarket.priceLay;
        existingMarket.priceDraw = freshMarket.priceDraw;
        await this.marketRepo.save(existingMarket);
      } else {
        const newMarket = this.marketRepo.create(freshMarket);
        await this.marketRepo.save(newMarket);
      }
    }
  }

  async setMarketFinished(id: MarketDto['id']): Promise<void> {
    await this.marketRepo.update(id, {
      marketStatus: MarketStatusType.Finished,
    });
  }

  async placeBet(bet: {
    marketId: number;
    stake: number;
    betType: BetType;
    price: number;
  }): Promise<BetDbEntity> {
    const newBet = this.betRepo.create(bet);
    return this.betRepo.save(newBet);
  }

  async settleBet(id: number, pnl: number): Promise<void> {
    await this.betRepo.update(id, {
      settled: true,
      pnl,
    });
  }

  async getOpenBets(): Promise<BetDbEntity[]> {
    return await this.betRepo.find({
      where: {
        settled: false,
      },
    });
  }

  async getAllBets(): Promise<BetDbEntity[]> {
    return await this.betRepo.find();
  }

  async getOpenMarkets(): Promise<MarketDbEntity[]> {
    return await this.marketRepo.find({
      where: {
        marketStatus: MarketStatusType.Open,
      },
    });
  }

  async getMarketById(id: MarketDto['id']): Promise<MarketDbEntity | null> {
    return await this.marketRepo.findOne({
      where: {
        id,
      },
    });
  }

  async finishOldMarkets(): Promise<void> {
    const cutoffTime = new Date(Date.now() - 4 * 60 * 60 * 1000); // 4 hours ago
    await this.marketRepo.update(
      {
        startingTime: LessThan(cutoffTime),
      },
      {
        marketStatus: MarketStatusType.Finished,
      },
    );
  }
}
