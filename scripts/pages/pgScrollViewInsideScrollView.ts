import PgScrollViewInsideScrollViewDesign from 'generated/pages/pgScrollViewInsideScrollView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';

export default class PgScrollViewInsideScrollView extends withDismissAndBackButton(PgScrollViewInsideScrollViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  makeInnerScrollViewGetTouches() {
    if (System.OS === System.OSType.ANDROID) {
      this.svInner.onTouchMoved = () => {
        this.svOuter.layout.android.requestDisallowInterceptTouchEvent(true);
        return false;
      };
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.makeInnerScrollViewGetTouches();
  }

  onLoad() {
    super.onLoad();
  }
}
