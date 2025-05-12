import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../../common/logger/logger.service';
import { IPlaceBetParams } from '../../../../common/entities/place-bet.entities';
import { DbBookmakerService } from '../../../../common/db-bookmaker/services/db-bookmaker.service';

@Injectable()
export class PlaceBetService {
  constructor(
    private logger: LoggerService,
    private dbBookmakerService: DbBookmakerService,
  ) {}

  async placeBet(bet: IPlaceBetParams): Promise<void> {
    try {
      await this.dbBookmakerService.placeBet(bet);
    } catch (err) {
      this.logger.error('Error has happened when placing bet', { error: err });
    }
  }
}
