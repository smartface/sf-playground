import PgShimmerFlexLayoutDesign from 'generated/pages/pgShimmerFlexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import ShimmerFlexLayout from '@smartface/native/ui/shimmerflexlayout';
import Button from '@smartface/native/ui/button';

export default class PgShimmerFlexLayout extends withDismissAndBackButton(PgShimmerFlexLayoutDesign) {
  shimmerLayout: ShimmerFlexLayout;
  btnToggleShimmer: Button;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.shimmerLayout = this.children['shimmerFlexLayout1'];
    this.btnToggleShimmer = this.children['btnToggleShimmer'];
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }
  initShimmerFlexLayout() {
    this.shimmerLayout.startShimmering();
  }
  initButton() {
    this.btnToggleShimmer.on('press', () => {
      if (this.shimmerLayout.isShimmering) {
        this.shimmerLayout.stopShimmering();
        this.btnToggleShimmer.text = 'Start Shimmering';
      } else {
        this.shimmerLayout.startShimmering();
        this.btnToggleShimmer.text = 'Stop Shimmering';
      }
    });
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.btnToggleShimmer.onPress = () => {
      console.info(this.router.canGoBack());
      // this.router.pushAndBack()
    };
  }
}
