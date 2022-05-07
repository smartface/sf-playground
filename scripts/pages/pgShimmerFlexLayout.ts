import PgShimmerFlexLayoutDesign from 'generated/pages/pgShimmerFlexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';

export default class PgShimmerFlexLayout extends withDismissAndBackButton(PgShimmerFlexLayoutDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButton() {
    this.btnToggleShimmer.on('press', () => {
      console.info(this.sfl.isShimmering);
      if (this.sfl.isShimmering) {
        this.sfl.stopShimmering();
        this.btnToggleShimmer.text = 'Start Shimmering';
      } else {
        this.sfl.startShimmering();
        this.btnToggleShimmer.text = 'Stop Shimmering';
      }
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initButton();
  }
}
