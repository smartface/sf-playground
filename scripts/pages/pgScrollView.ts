import PgScrollViewDesign from 'generated/pages/pgScrollView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import ContentInsetAdjustment from '@smartface/native/ui/shared/ios/contentinsetadjustment';
import OverScrollMode from '@smartface/native/ui/shared/android/overscrollmode';
import { ScrollViewEdge } from '@smartface/native/ui/scrollview/scrollview';
import { ScrollViewEvents } from '@smartface/native/ui/scrollview/scrollview-events';

/**
 * TODO: SWITCH SVSECONDARY TO HORIZONTAL
 */

export default class PgScrollView extends withDismissAndBackButton(PgScrollViewDesign) {
  private _bounces = true;
  private _scrollBarEnabled = true;
  private _edge = ScrollViewEdge.TOP;
  private _scrollLock = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnBounces.on('press', () => this.changeBounces());
    this.btnScrollBarEnabled.on('press', () => this.setScrollBarEnabled());
    this.btnAlways.on('press', () => this.setContentInset({ iosType: ContentInsetAdjustment.ALWAYS, andType: OverScrollMode.ALWAYS }));
    this.btnAutomatic.on('press', () => this.setContentInset({ iosType: ContentInsetAdjustment.AUTOMATIC, andType: OverScrollMode.AUTO }));
    this.btnNever.on('press', () => this.setContentInset({ iosType: ContentInsetAdjustment.NEVER, andType: OverScrollMode.NEVER }));
    this.btnScrollableaxes.on('press', () => this.setContentInset({ iosType: ContentInsetAdjustment.SCROLLABLEAXES, andType: OverScrollMode.AUTO })); //Android doesn't have SCROLLABLEAXES
    this.btnScrollToCoordinate.on('press', () => this.scrollToCoordinate());
    this.btnScrollToEdge.on('press', () => this.scrollToEdge());

    this.svMain.on(ScrollViewEvents.Scroll, (params) => {
      if (!this._scrollLock) {
        console.log('on scroll', params);
        this._scrollLock = true;
        setTimeout(() => (this._scrollLock = false), 2000);
      }
    });
  }

  scrollToCoordinate() {
    this.svMain.scrollToCoordinate(400, true);
    this.svSecondary.scrollToCoordinate(400, true);
  }

  scrollToEdge() {
    this._edge = this._edge === ScrollViewEdge.BOTTOM ? ScrollViewEdge.TOP : ScrollViewEdge.BOTTOM;
    this.svMain.scrollToEdge(this._edge);
    this.svSecondary.scrollToEdge(this._edge);
  }

  setScrollBarEnabled() {
    this._scrollBarEnabled = !this._scrollBarEnabled;
    this.svMain.scrollBarEnabled = this._scrollBarEnabled;
    this.svSecondary.scrollBarEnabled = this._scrollBarEnabled;
  }

  setContentInset(params: { iosType: ContentInsetAdjustment; andType: OverScrollMode }) {
    console.log('setContentInset: ', params.iosType, ' ', params.andType);
    this.svMain.ios.contentInsetAdjustmentBehavior = params.iosType;
    this.svMain.android.overScrollMode = params.andType;
    this.svSecondary.ios.contentInsetAdjustmentBehavior = params.iosType;
    this.svSecondary.android.overScrollMode = params.andType;
  }

  changeBounces() {
    this._bounces = !this._bounces;
    console.log('changeBounces: ', this._bounces);
    this.svMain.ios.bounces = this._bounces;
    this.svSecondary.ios.bounces = this._bounces;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
