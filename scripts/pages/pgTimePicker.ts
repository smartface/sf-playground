import PgTimePickerDesign from 'generated/pages/pgTimePicker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import TimePicker from "@smartface/native/ui/timepicker";

export default class PgTimePicker extends withDismissAndBackButton(PgTimePickerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    const myTimePicker = new TimePicker();
    myTimePicker.on('selected', (time) => {
        console.log('Hour: ' + time.hour + ' Minute: ' + time.minute);
    });

    myTimePicker.is24HourFormat = true;
    myTimePicker.show();
  }
}
