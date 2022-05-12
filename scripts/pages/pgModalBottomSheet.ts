import PgModalBottomSheetDesign from 'generated/pages/pgModalBottomSheet';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgModalBottomSheet extends withDismissAndBackButton(PgModalBottomSheetDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initButton() {
    this.btnOpen.on('press', () => {
      this.router.push('bottomSheet');
    });
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
    this.initButton();
  }
}
