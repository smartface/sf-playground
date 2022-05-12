import PgTimePickerDesign from 'generated/pages/TimePicker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import TimePicker from '@smartface/native/ui/timepicker';

export default class PgTimePicker extends withDismissAndBackButton(PgTimePickerDesign) {
  private timePicker: TimePicker;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShowPicker.on('press', () => this.timePicker.show());
  }

  initPicker() {
    this.timePicker = new TimePicker();
    this.timePicker.on('selected', (time) => {
      console.log('Hour: ' + time.hour + ' Minute: ' + time.minute);
    });
    this.timePicker.is24HourFormat = true;
    this.timePicker.setTime({ hour: new Date().getHours(), minute: new Date().getMinutes() });
  }

  onShow() {
    super.onShow();
    this.initPicker();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
