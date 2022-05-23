import PgCalendarDesign from 'generated/pages/pgCalendar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { Calendar } from '@smartface/component-calendar';
import { calendarThemeGenerator } from 'lib/CalendarTheme';
import View from '@smartface/native/ui/view/view';

export default class PgCalendar extends withDismissAndBackButton(PgCalendarDesign) {
  calendar: Calendar;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initializeCalendar() {
    try {
      this.calendar = new Calendar({
        useRangeSelection: false,
        theme: calendarThemeGenerator()
      });
      this.flCalendarWrapper.addChild(this.calendar, 'calendar');
      this.calendar.onDaySelect = (date) => console.info('onDaySelect', date);
      this.calendar.onMonthChange = (date) => console.info('onMonthChange', date);
      this.calendar.changeCalendar('tr', 'gregorian', {}, 1);
    } catch (error) {
      console.error(error);
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initializeCalendar();
  }
}
