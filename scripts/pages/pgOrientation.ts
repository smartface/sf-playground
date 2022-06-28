import PgOrientationDesign from 'generated/pages/pgOrientation';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { PageOrientation } from '@smartface/native/ui/page/page';
import { Border } from '@smartface/native/ui/view/view';

const OrientationKeys = Object.keys(PageOrientation);

export default class PgOrientation extends withDismissAndBackButton(PgOrientationDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lblOrientation.text = OrientationKeys.find((key) => PageOrientation[key] === this.orientation);
    this.onOrientationChange = (e) => {
      const currentOrientation = OrientationKeys.find((key) => PageOrientation[key] === e.orientation);
      this.lblOrientation.text = currentOrientation;
    };
    this.btnOrientationAuto.onPress = () => (this.lblOrientationMode.text = this.btnOrientationAuto.text.toUpperCase());
    this.btnOrientationPortrait.onPress = () => (this.lblOrientationMode.text = this.btnOrientationPortrait.text.toUpperCase());
    this.btnOrientationLandscape.onPress = () => (this.lblOrientationMode.text = this.btnOrientationLandscape.text.toUpperCase());
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.flOrientationModeWrapper.maskedBorders = [Border.BOTTOM_LEFT, Border.BOTTOM_RIGHT];
    this.flOrientationModeWrapper.borderRadius = 50;
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
