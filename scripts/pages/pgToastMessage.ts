import PgToastMessageDesign from 'generated/pages/pgToastMessage';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Toast from '@smartface/native/ui/toast';
import Color from '@smartface/native/ui/color';

export default class PgToastMessage extends withDismissAndBackButton(PgToastMessageDesign) {
  toast: Toast
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
    this.toast = new Toast({
        message: "This is a toast message",
        actionTextColor: Color.GREEN,
        backgroundColor: Color.GRAY,
        messageTextColor: Color.RED,
        bottomOffset: 300,
        onDismissed: () => console.log("test constructor event")
    });
    this.toast.on(Toast.Events.Dismissed, () => {
        console.log('test eventemitter');
    })
    this.toast.message = "This is a new toast message";
    this.toast.createAction("Action Title", () => {console.log("Action Pressed!")});
    this.toast.show();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
