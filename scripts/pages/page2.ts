import Page2Design from 'generated/pages/page2';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class Page2 extends withDismissAndBackButton(Page2Design) {
  private routeData: any;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnSayHello.on('press', () => {
      alert('Hello World!');
    });
    this.routeData = route?.getState().routeData || {};
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    console.info(this.routeData?.message);
    this.initBackButton(this.router);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
