import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketDbEntity } from '../entities/market.dto';
import { BetDbEntity } from '../entities/bet.dto';
import { DbBookmakerService } from './services/db-bookmaker.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketDbEntity, BetDbEntity])],
  providers: [DbBookmakerService],
  exports: [DbBookmakerService],
})
export class DbBookmakerModule {}
