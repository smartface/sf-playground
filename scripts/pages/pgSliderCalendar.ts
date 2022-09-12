import PgSliderCalendarDesign from 'generated/pages/pgSliderCalendar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Screen from '@smartface/native/device/screen';
import { Calendar } from '@smartface/component-calendar';
import GviDayOfCalendar from 'components/GviDayOfCalendar';
import { CalendarCore } from "@smartface/component-calendar";



export default class PgSliderCalendar extends withDismissAndBackButton(PgSliderCalendarDesign) {
    calendar: Calendar;
    c: any;
    scrollState: { startX: number, endX: number }

    constructor(private router?: Router, private route?: Route) {
        super({});
        this.scrollState = { startX: 0, endX: 0 }
        this.c = new CalendarCore();
        this.c.changeCalendar("tr", "gregorian");
        this.c.subscribe((oldState, newState) => {

        });
        this.c.setDate({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        });
        this.c.now();

        this.gvMain.on('scroll', () => {
        });
        this.gvMain.on('scrollStateChanged', (scrollState, contentOffset) => {
            if (scrollState == 1) {
                this.scrollState.startX = contentOffset.x;
            }
            if (this.scrollState.startX != 0 && scrollState == 2) {
                this.scrollState.endX = contentOffset.x;
                if (this.scrollState.startX > this.scrollState.endX) {
                    this.prevWeek();
                }
                if (this.scrollState.startX < this.scrollState.endX) {
                    this.nextWeek();
                } else {
                    "dont change"
                }
            }
            if (scrollState == 0) {
                this.scrollState = { startX: 0, endX: 0 }
            }

        });
    }
    prevWeek() {
        this.c.prevWeek();
        const currentDate = this.c.getState().selectedDays[0].localeDate
        const tarih = new Date(`${currentDate.year}-${currentDate.month}-${currentDate.day}`);
        tarih.setDate(tarih.getDate() - 7);
        this.c.setSelectedDate({
            day: tarih.getDate(),
            month: tarih.getMonth() + 1,
            year: tarih.getFullYear()
        })
        this.refreshGridView();
        this.gvMain.scrollTo(1, true);
        this.lblFullDate.text = `${this.getSelectedDay()} ${this.getSelectedMonthFullName()} ${this.getSelectedYear()}`

    }
    nextWeek() {
        console.log(this.c.getState());
        this.c.nextWeek();
        console.log(this.getCurrentWeek());
        const currentDate = this.c.getState().selectedDays[0].localeDate
        const tarih = new Date(`${currentDate.year}-${currentDate.month}-${currentDate.day}`);
        tarih.setDate(tarih.getDate() + 7);
        this.c.setSelectedDate({
            day: tarih.getDate(),
            month: tarih.getMonth() + 1,
            year: tarih.getFullYear()
        })
        this.refreshGridView();
        this.gvMain.scrollTo(1, true);
        this.lblFullDate.text = `${this.getSelectedDay()} ${this.getSelectedMonthFullName()} ${this.getSelectedYear()}`


    }
    refreshGridView() {
        this.gvMain.refreshData();
        this.gvMain.scrollTo(1, true);
    }
    getCurrentWeek() {
        return this.c.getState().weekIndex;
    }
    getSelectedYear() {
        return this.c.getState().selectedDays[0].date.year;
    }
    getSelectedDay() {
        return this.c.getState().selectedDays[0].date.day;

    }
    getSelectedMonthFullName() {
        return this.c.getState().selectedDays[0].daymonthInfo.longName;
    }

    setButtonOnGridView(gridViewItem: GviDayOfCalendar, weekIndex: number) {
        this.c.getState().month.days[weekIndex].forEach((day, index) => {
            const selectedDate = {
                day: day.day,
                month: this.c.getState().month.date.month,
                year: this.c.getState().month.date.year
            }
            if (day.month == "next") {
                selectedDate.month = this.c.getState().month.nextMonth.date.month
                selectedDate.year = this.c.getState().month.nextMonth.date.year
            }
            if (day.month == "previous") {
                selectedDate.month = this.c.getState().month.previousMonth.date.month
                selectedDate.year = this.c.getState().month.previousMonth.date.year
            }
            gridViewItem[`_day${index}Click`] = () => {
                this.c.setSelectedDate(selectedDate)
                gridViewItem.selectedDay = selectedDate;
                this.lblFullDate.text = `${this.getSelectedDay()} ${this.getSelectedMonthFullName()} ${this.getSelectedYear()}`

            }
        })

    }

    setDaysOnGridView(gridViewItem: GviDayOfCalendar, index: number) {
        if (index == 0) {
            if (this.getCurrentWeek() == 0) {
                let lastWeekIndexOnPrevMonth: number;
                const firstDateInWeek = this.c.getState().month.days[0][0];
                this.c.prevWeek();
                this.c.getState().month.days.map((days, indexDays) => {
                    days.map((day, indexDay) => {
                        if ((day.day == firstDateInWeek.day) && indexDay == 0) {
                            lastWeekIndexOnPrevMonth = indexDays;
                        }
                    })
                });
                gridViewItem.days = this.c.getState().month.days[lastWeekIndexOnPrevMonth - 1]
                this.setButtonOnGridView(gridViewItem, 0)
                this.c.nextWeek();
            } else {
                gridViewItem.days = this.c.getState().month.days[this.getCurrentWeek() - 1]
                this.setButtonOnGridView(gridViewItem, this.getCurrentWeek() - 1)
            }
        }
        if (index == 1) {
            gridViewItem.days = this.c.getState().month.days[this.getCurrentWeek()]
            this.setButtonOnGridView(gridViewItem, this.getCurrentWeek())
            gridViewItem.selectedDay = this.c.getState().selectedDays[0].date
        }
        if (index == 2) {
            gridViewItem.days = this.c.getState().month.days[this.getCurrentWeek() + 1]
            this.setButtonOnGridView(gridViewItem, this.getCurrentWeek() + 1)


        }
        this.lblFullDate.text = `${this.getSelectedDay()} ${this.getSelectedMonthFullName()} ${this.getSelectedYear()}`


    }


    initGridView() {
        this.gvMain.refreshEnabled = false;
        this.gvMain.scrollBarEnabled = false;
        this.gvMain.itemCount = 3;
        this.gvMain.layoutManager.onItemLength = () => Screen.width;
        this.gvMain.paginationEnabled = true;
        this.gvMain.scrollTo(1, true)
        this.gvMain.onItemBind = (gridViewItem: GviDayOfCalendar, index) => {
            this.setDaysOnGridView(gridViewItem, index)
        }
    }
    setDaysName() {
        this.day0lbl.text = this.c.getState().month.daysMin[0];
        this.day1lbl.text = this.c.getState().month.daysMin[1];
        this.day2lbl.text = this.c.getState().month.daysMin[2];
        this.day3lbl.text = this.c.getState().month.daysMin[3];
        this.day4lbl.text = this.c.getState().month.daysMin[4];
        this.day5lbl.text = this.c.getState().month.daysMin[5];
        this.day6lbl.text = this.c.getState().month.daysMin[6];
    }

    onShow() {
        super.onShow();
        this.initBackButton(this.router);

    }


    onLoad() {
        super.onLoad();
        this.setDaysName();
        this.initGridView();
    }
}




// if(this.getCurrentWeek() == 0){
//     let lastWeekIndexOnPrevMonth: number;
//     const firstDateInWeek = this.c.getState().month.days[0][0];
// this.c.prevWeek();
// this.c.getState().month.days.map((days, indexDays) => {
//  days.map((day, indexDay) => {
//      if ((day.day == firstDateInWeek.day) && indexDay == 0) {
//          lastWeekIndexOnPrevMonth = indexDays;
//      }
//  })
// });
// gridViewItem.days = this.c.getState().month.days[lastWeekIndexOnPrevMonth -1]
// this.c.nextWeek();
// }else{