import PgQuickLookDesign from 'generated/pages/pgQuickLook';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import QuickLook from '@smartface/native/ui/quicklook';
import Color from '@smartface/native/ui/color';

export default class PgQuickLook extends withDismissAndBackButton(PgQuickLookDesign) {
  quickLook: QuickLook;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnLookImage.on('press', () => this.quick('image'));
    this.btnLookPDF.on('press', () => this.quick('pdf'));
  }

  quick(type: 'image' | 'pdf') {
    if (System.OS == System.OSType.IOS) {
      this.quickLook = new QuickLook();
      let pdf = 'assets://sample.pdf';
      let image = 'images://smartface.png';
      this.quickLook.document = [type === 'image' ? image : pdf];
      this.quickLook.titleColor = Color.DARKGRAY;
      this.quickLook.itemColor = Color.create('#00A1F1');

      this.quickLook.show(this);
    } else {
      alert(`QuickLook doesn't support Android`);
    }
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
