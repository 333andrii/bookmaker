import { Module } from '@nestjs/common';
import { OddsGetterFacade } from './odds-getter.facade';
import { EventAdapterModule } from '../../../common/event-adapter/event-adapter.module';
import { OddsGetterManager } from './services/odds-getter.manager';
import { OddsGetterApiService } from './services/odds-getter-api.service';
import { OddsGetterStatusService } from './services/odds-getter-status.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '../../../common/logger/logger.module';
import { RefreshOddsConnectorModule } from '../../../common/connectors/refresh-odds/refresh-odds.connector.module';
import { DbBookmakerModule } from '../../../common/db-bookmaker/db-bookmaker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketDbEntity } from '../../../common/entities/market.dto';
import { BetDbEntity } from '../../../common/entities/bet.dto';
import * as dotenv from 'dotenv';
import { OddsGetterTransformService } from './services/odds-getter-transform.service';
import { OddsGetterController } from './odds-getter.controller';
dotenv.config();

@Module({
  //here is possible to extend with factory to specify the Redis client IP or any other transports
  imports: [
    EventAdapterModule.forTransport(),
    ScheduleModule.forRoot(),
    LoggerModule.withAdapter(), //each microservice may have it's own logger
    RefreshOddsConnectorModule,
    DbBookmakerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: 5432,
      username: process.env.DB_POSTGRES_USER as string,
      password: process.env.DB_POSTGRES_PASS as string,
      database: 'betting',
      entities: [MarketDbEntity, BetDbEntity],
      synchronize: true,
    }),
  ],
  controllers: [OddsGetterController],
  providers: [
    OddsGetterFacade,
    OddsGetterManager,
    OddsGetterApiService,
    OddsGetterStatusService,
    OddsGetterTransformService,
  ],
})
export class OddsGetterModule {}
