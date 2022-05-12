import HeaderBarItem = require('@smartface/native/ui/headerbaritem');
import touch = require('@smartface/extension-utils/lib/touch');
import Image = require('@smartface/native/ui/image');
import PageTitleLayout from 'components/PageTitleLayout';
import Color = require('@smartface/native/ui/color');
import System = require('@smartface/native/device/system');
import Page2Design from 'generated/pages/page2';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgPage2 extends withDismissAndBackButton(Page2Design) {
  private routeData: any;
  constructor(private router?: Router, private route?: Route) {
    super({});
    touch.addPressEvent(this.btnSayHello, () => {
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
