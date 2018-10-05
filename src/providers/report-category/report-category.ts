import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ReportCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportCategoryProvider {

  endpoint: string = "report_categories";

  constructor(
    public http: HttpClient,
     public api: Api
  ) {

  }

  getReportCategories()
  {
    return this.api.get(this.endpoint, []);
  }
}
