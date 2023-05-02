import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  private defaultDateFormat = 'DD/MM/YYYY';
  private defaultDateTimeFormat = 'DD/MM/YYYY HH:mm';

  constructor() {
  }

  getMomentDateFromDateStr(dateStr: string) {
    return moment(dateStr, this.defaultDateFormat);
  }
}
