import PgNoTouchDesign from 'generated/pages/pgNoTouch';
import System from '@smartface/native/device/system';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgNoTouch extends withDismissAndBackButton(PgNoTouchDesign) {
  isPageTouchEnabled = true;
  touchCounter = 0;
  constructor(private router?: Router, private route?: Route) {
    super({});
    // alert("TEST");
  }

  async yourServiceCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 3000);
    });
  }

  initButtons() {
    this.btnTimeout.onPress = async () => {
      this.togglePageTouch(false);
      await this.yourServiceCall();
      this.togglePageTouch(true);
    };
    this.btnCounter.onPress = () => {
      this.touchCounter++;
      this.btnCounter.text = `Touch Counter : ${this.touchCounter}`;
    };
  }

  togglePageTouch(touchEnabled: boolean) {
    this.isPageTouchEnabled = touchEnabled;
    this.btnTimeout.enabled = this.isPageTouchEnabled;
    this.lblTouchIndicator.text = `Current Touch Status : ${this.isPageTouchEnabled ? 'Enabled' : 'Disabled'}`;
    if (System.OS === System.OSType.IOS) {
      this.layout.touchEnabled = this.isPageTouchEnabled;
    } else {
      /**
       * If you need to use this event somewhere else, add the code snippet below.
       */
      this.layout.android.onInterceptTouchEvent = () => {
        if (this.isPageTouchEnabled === false) {
          return !this.isPageTouchEnabled;
        }
        // ...your other code
      };
    }
  }
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }
  onLoad() {
    super.onLoad();
    this.initButtons();
  }
}
