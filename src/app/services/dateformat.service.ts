import {Injectable} from "@angular/core";

@Injectable()
export class DateFormatService {

  constructor() {
  }

  formatDateForMysql(newDate: any) {
	  var frmtDay = ("0" + newDate.getDate()).slice(-2);
	  var frmtMonth = ("0" + (newDate.getMonth() + 1)).slice(-2);
	  return newDate.getFullYear()+"-"+frmtMonth+"-"+frmtDay;
  }
  formatDateForJs(dbDate: string) {
	  var replacedDate = dbDate.replace(/-/g, "/");
	  var newDate = new Date(replacedDate);
	  return { date: { year: newDate.getFullYear(), month: newDate.getMonth()+1, day: newDate.getDate() },jsdate:newDate };
  }


}
