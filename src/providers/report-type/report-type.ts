import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ReportTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportTypeProvider {

  endpoint: string = "report_types";

  constructor(
    public http: HttpClient,
    public api: Api
  ) {

  }

  getReportTypes()
  {
    return this.api.get(this.endpoint, []);
  }
}
