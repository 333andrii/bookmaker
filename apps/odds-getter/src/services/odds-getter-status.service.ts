import { Injectable } from '@nestjs/common';

@Injectable()
export class OddsGetterStatusService {
  private _allRuns = 0;
  private _successRuns = 0;
  private _failedRuns: number = 0;
  private _inProgress = false;

  getSuccessRuns(): number {
    return this._successRuns;
  }

  getFailedRuns(): number {
    return this._failedRuns;
  }

  isInProgress(): boolean {
    return this._inProgress;
  }

  runStart() {
    this._inProgress = true;
    this._allRuns++;
  }
  runEnd() {
    this._successRuns++;
    this._inProgress = this._failedRuns + this._successRuns !== this._allRuns;
  }

  runFailed() {
    this._failedRuns++;
  }
}
