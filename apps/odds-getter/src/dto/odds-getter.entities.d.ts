import { ApiResponse, ServerErrorResponse } from 'common/entities/request.entities';
export type OddsGetterStatusDto = ApiResponse<IOddsGetterStatusData> | ServerErrorResponse<string>;
export interface IOddsGetterStatusData {
    failedRuns: number;
    successRuns: number;
    isInProgress: boolean;
}
