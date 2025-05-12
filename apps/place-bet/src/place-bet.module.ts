import { Module } from '@nestjs/common';
import { PlaceBetFacade } from './place-bet.facade';
import { EventAdapterModule } from '../../../common/event-adapter/event-adapter.module';
import { PlaceBetController } from './place-bet.controller';
import { LoggerModule } from '../../../common/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketDbEntity } from '../../../common/entities/market.dto';
import { BetDbEntity } from '../../../common/entities/bet.dto';
import { DbBookmakerModule } from '../../../common/db-bookmaker/db-bookmaker.module';
import * as dotenv from 'dotenv';
import { PlaceBetService } from './services/place-bet.service';
import { BetSettlementService } from './services/bet-settlement.service';
dotenv.config();

@Module({
  //here is possible to extend with factory to specify the Redis client IP or any other transports
  imports: [
    EventAdapterModule.forTransport(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_POSTGRES_USER as string,
      password: process.env.DB_POSTGRES_PASS as string,
      database: 'betting',
      entities: [MarketDbEntity, BetDbEntity],
      synchronize: true,
    }),
    DbBookmakerModule,
    LoggerModule.withAdapter() /*each microservice may have it's own logger*/,
  ],
  providers: [PlaceBetFacade, PlaceBetService, BetSettlementService],
  controllers: [PlaceBetController],
})
export class PlaceBetModule {}
