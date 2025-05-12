import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { GoogleAuth, JWTInput } from 'google-auth-library';
import { GoogleSheetName } from '../constants/google-spreadsheet.constants';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GoogleSpreadsheetClient {
  private _init: Promise<void>;
  //private sheetsService: ReturnType<(typeof google)['sheets']>;
  private sheetsService: sheets_v4.Sheets;
  private spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID as string;

  onModuleInit() {
    this._init = this._initialize();
  }

  async readSheet(range: string): Promise<any> {
    await this._init;
    const res = await this.sheetsService.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    });
    return res.data.values;
  }

  async updateSheet(
    sheetName: GoogleSheetName,
    cell: string,
    values: string[][],
  ): Promise<any> {
    await this._init;

    await this.sheetsService.spreadsheets.values.clear({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A2:G`, //I know it's hardcoded and can be changed
    });

    await this.sheetsService.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${cell}`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  }

  private async _initialize() {
    const credentialsPath = path.resolve(
      __dirname,
      '../../../../credentials/',
      process.env.GOOGLE_SHEET_CREDENTIALS_FILE_NAME as string,
    );
    const credentials = JSON.parse(
      fs.readFileSync(credentialsPath, 'utf8'),
    ) as JWTInput;

    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    //@ts-expect-error Later to resolve true type for the Google Spreadsheet
    this.sheetsService = google.sheets({ version: 'v4', auth: authClient });
  }
}
