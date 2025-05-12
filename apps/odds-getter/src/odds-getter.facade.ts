import { Injectable } from '@nestjs/common';
import { OddsGetterStatusService } from './services/odds-getter-status.service';
import { IOddsGetterStatusData } from './dto/odds-getter.entities';
import { OddsGetterManager } from './services/odds-getter.manager';

@Injectable()
export class OddsGetterFacade {
  constructor(
    private oddsGetterStatus: OddsGetterStatusService,
    private oddsManager: OddsGetterManager,
  ) {}
  async refreshOdds(): Promise<void> {
    return this.oddsManager.refreshOdds();
  }
  getOddsGetterStatus(): IOddsGetterStatusData {
    return {
      failedRuns: this.oddsGetterStatus.getFailedRuns(),
      successRuns: this.oddsGetterStatus.getSuccessRuns(),
      isInProgress: this.oddsGetterStatus.isInProgress(),
    };
  }
}
