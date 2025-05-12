import { Module } from '@nestjs/common';
import { GSheetFacade } from './g-sheet.facade';
import { EventAdapterModule } from '../../../common/event-adapter/event-adapter.module';
import { GSheetController } from './g-sheet.controller';
import { GoogleSpreadsheetClient } from './services/google-spreadsheet.client';
import { GoogleSpreadsheetModifier } from './services/google-spreadsheet.modifier';
import { LoggerModule } from '../../../common/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketDbEntity } from '../../../common/entities/market.dto';
import { BetDbEntity } from '../../../common/entities/bet.dto';
import { DbBookmakerModule } from '../../../common/db-bookmaker/db-bookmaker.module';
import * as dotenv from 'dotenv';
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
  providers: [GSheetFacade, GoogleSpreadsheetClient, GoogleSpreadsheetModifier],
  controllers: [GSheetController],
})
export class GSheetModule {}
