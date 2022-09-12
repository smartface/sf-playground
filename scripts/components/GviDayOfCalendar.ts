import Color from '@smartface/native/ui/color';
import GviDayOfCalendarDesign from 'generated/my-components/GviDayOfCalendar';

export default class GviDayOfCalendar extends GviDayOfCalendarDesign {
    pageName?: string | undefined;
    _days;
    _day0Click: (...args) => void;
    _day1Click: (...args) => void;
    _day2Click: (...args) => void;
    _day3Click: (...args) => void;
    _day4Click: (...args) => void;
    _day5Click: (...args) => void;
    _day6Click: (...args) => void;
    _selectedDayIndex;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.btnDay0.on('press', () => {
            this?._day0Click();
        })
        this.btnDay1.on('press', () => {
            this?._day1Click();
        })
        this.btnDay2.on('press', () => {
            this?._day2Click();
        })
        this.btnDay3.on('press', () => {
            this?._day3Click();
        })
        this.btnDay4.on('press', () => {
            this?._day4Click();
        })
        this.btnDay5.on('press', () => {
            this?._day5Click();
        })
        this.btnDay6.on('press', () => {
            this?._day6Click();
        })

    }
    get days() {
        return this._days;
    }
    set days(value) {
        this._days = value;
        this.initDayButton();
    }
    initDayButton() {
        this._days.forEach((day, index) => {
            if (day.isWeekend) {
                this[`btnDay${index}`].textColor = Color.GRAY;
            }
            if (day.today) {
                this[`btnDay${index}`].textColor = Color.RED;
            } else {
                this[`btnDay${index}`].textColor = Color.BLACK;
            }
            this[`btnDay${index}`].text = day.day;
            this[`btnDay${index}`].backgroundColor = Color.WHITE;
        })
    }
    get onDay0Click(): (...args) => void {
        return this._day0Click;
    }
    set onDay0Click(value: (...args) => void) {
        this._day0Click = value;
    }
    get onDay1Click(): (...args) => void {
        return this._day1Click;
    }
    set onDay1Click(value: (...args) => void) {
        this._day1Click = value;
    }
    get onDay2Click(): (...args) => void {
        return this._day2Click;
    }
    set onDay2Click(value: (...args) => void) {
        this._day2Click = value;
    }
    get onDay3Click(): (...args) => void {
        return this._day3Click;
    }
    set onDay3Click(value: (...args) => void) {
        this._day3Click = value;
    }
    get onDay4Click(): (...args) => void {
        return this._day4Click;
    }
    set onDay4Click(value: (...args) => void) {
        this._day4Click = value;
    }
    get onDay5Click(): (...args) => void {
        return this._day5Click;
    }
    set onDay5Click(value: (...args) => void) {
        this._day5Click = value;
    }
    get onDay6Click(): (...args) => void {
        return this._day6Click;
    }
    set onDay6Click(value: (...args) => void) {
        this._day6Click = value;
    }
    get selectedDay() {
        return this._selectedDay;
    }
    set selectedDay(value) {
        this.initDayButton();
        this._selectedDay = value;
        const selectedIndex = this.findSelectedDayByIndex(value)
        this[`btnDay${selectedIndex}`].textColor = Color.WHITE
        this[`btnDay${selectedIndex}`].backgroundColor = Color.BLACK;
    }

    private findSelectedDayByIndex(value){
        console.log(value, ' value')
        let selectedIndex;
        this._days.forEach((day,index)=>{
            if(day.day == value.day){
                selectedIndex = index
            }
        })
        return selectedIndex;
    }

}
