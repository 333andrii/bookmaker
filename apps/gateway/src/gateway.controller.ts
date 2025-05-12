import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { GatewayFacade } from './gateway.facade';
import e from 'express';
import { IPlaceBetParams } from '../../../common/entities/place-bet.entities';
import { LoggerService } from '../../../common/logger/logger.service';

@Controller('api')
export class GatewayController {
  constructor(
    private gatewayFacade: GatewayFacade,
    private logger: LoggerService,
  ) {}

  @Post('place-bet')
  placeBet(
    @Req() request: e.Request,
    @Res() response: e.Response,
    @Body() placeBetParams: IPlaceBetParams,
  ) {
    try {
      this.gatewayFacade.placeBet(placeBetParams);
      response.send('Placing');
    } catch (err) {
      const errMsg = 'Gateway error placing bet';
      this.logger.error(errMsg, { error: err });
      response.status(500).send('Gateway error placing bet');
    }
  }

  @Get('/refresh-odds')
  refreshOdds(@Res() response: e.Response) {
    try {
      this.gatewayFacade.updateOddsBook();
      response.send('Started');
    } catch (err) {
      const errMsg = 'Gateway error refreshing odds';
      this.logger.error(errMsg, { error: err });
      response.status(500).send('Gateway error refreshing odds');
    }
  }
}
