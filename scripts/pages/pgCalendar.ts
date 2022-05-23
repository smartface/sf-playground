import PgCalendarDesign from 'generated/pages/pgCalendar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { Calendar } from '@smartface/component-calendar';
import { calendarThemeGenerator } from 'lib/CalendarTheme';

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
      this.calendar.onDaySelect = (date) => {
        console.info('onDaySelect', date);
        this.lblEvents.text = 'onDaySelect: ' + JSON.stringify(date);
      };
      this.calendar.onMonthChange = (date) => {
        console.info('onMonthChange', date);
        this.lblEvents.text = 'onMonthChange: ' + JSON.stringify(date);
      };
      this.calendar.changeCalendar('tr', 'gregorian', {}, 1);

      this.calendar.setSpecialDays({
        byMonths: [
          {
            month: new Date().getMonth() + 1,
            days: [
              {
                day: Math.max(1, new Date().getDate() - 2),
                className: '.specialDay',
                calendars: {
                  '*': {
                    availableLangs: '*',
                    text: {
                      '*': 'specialDay 1 taken from calendar theme'
                    }
                  }
                },
                length: 1
              },
              {
                day: Math.min(28, new Date().getDate() + 2),
                className: '.specialDay2',
                calendars: {
                  '*': {
                    availableLangs: '*',
                    text: {
                      '*': 'specialDay 2 taken from calendar theme'
                    }
                  }
                },
                length: 1
              }
            ]
          }
        ]
      });
    } catch (error) {
      console.error(error);
    }
  }

  onShow() {
    super.onShow();
    this.calendar.addStyles(calendarThemeGenerator());
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.calendar.setSelectedDate({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    });
  }

  onLoad() {
    super.onLoad();
    this.initializeCalendar();
  }
}
