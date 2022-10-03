import PgActivityIndicatorDesign from 'generated/pages/pgActivityIndicator';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import { ActivityIndicatorViewStyle } from '@smartface/native/ui/activityindicator/activityindicator';

export default class PgActivityIndicator extends withDismissAndBackButton(PgActivityIndicatorDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnRed.on('press', () => this.setColorRed());
    this.btnBlue.on('press', () => this.setColorBlue());
    this.btnDefault.on('press', () => this.setActivityIndicatorStyleDefault());
    this.btnLarge.on('press', () => this.setActivityIndicatorStyleLarge());
  }

  setActivityIndicatorStyleDefault() {
    this.ai.ios.activityIndicatorViewStyle = ActivityIndicatorViewStyle.NORMAL;
  }

  setActivityIndicatorStyleLarge() {
    this.ai.ios.activityIndicatorViewStyle = ActivityIndicatorViewStyle.LARGE;
  }

  setColorRed() {
      this.ai.style.apply({ color: '#FF0000'});
  }

  setColorBlue() {
      this.ai.style.apply({ color: '#0000FF' });
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
  }
}
