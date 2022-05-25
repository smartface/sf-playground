import PgShimmerFlexLayoutDesign from 'generated/pages/pgShimmerFlexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Picker from '@smartface/native/ui/picker';
import { ShimmeringDirection } from '@smartface/native/ui/shimmerflexlayout/shimmerflexlayout';

export default class PgShimmerFlexLayout extends withDismissAndBackButton(PgShimmerFlexLayoutDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.slAlpha.on('valueChange', (value) => this.alphaChange(value));
    this.btnChangeDirection.on('press', () => this.directionPicker());
  }

  directionPicker() {
    const picker = new Picker();
    const fills = ['DOWN', 'LEFT', 'RIGHT', 'UP'];
    picker.items = fills;
    picker.on('selected', (index) => {
      console.info('selected: ', index);
      this.sfl.shimmeringDirection = ShimmeringDirection[fills[index]];
    });
    picker.show();
  }

  alphaChange(value: number) {
    this.sfl.baseAlpha = value / 100;
    this.lblAlpha.text = `Change baseAlpha (${(value / 100).toString()})`;
  }

  initButton() {
    this.btnToggleShimmer.on('press', () => {
      console.info('isShimmering: ', this.sfl.isShimmering);
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
