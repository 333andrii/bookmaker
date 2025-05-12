import { Module } from '@nestjs/common';
import { LoggerModule } from '../../logger/logger.module';
import { RefreshOddsConnectorApi } from './services/refresh-odds-connector.api';
import { RefreshOddsConnector } from './services/refresh-odds.connector';

@Module({
  imports: [LoggerModule.withAdapter()],
  providers: [RefreshOddsConnectorApi, RefreshOddsConnector],
  exports: [RefreshOddsConnector],
})
export class RefreshOddsConnectorModule {}
