import PgBlurViewDesign from 'generated/pages/pgBlurView';
import BlurView from '@smartface/native/ui/blurview';
import FlexLayout from '@smartface/native/ui/flexlayout';
import ImageView from '@smartface/native/ui/imageview';
import Button from '@smartface/native/ui/button';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import System from '@smartface/native/device/system';
import Picker from '@smartface/native/ui/picker';
import { BlurViewEffectStyle } from '@smartface/native/ui/blurview/blurview';
import Color from '@smartface/native/ui/color';

class StyleableBlurView extends styleableComponentMixin(BlurView) {}
class StyleableButton extends styleableComponentMixin(Button) {}
class StyleableImageView extends styleableComponentMixin(ImageView) {}

export default class PgBlurView extends withDismissAndBackButton(PgBlurViewDesign) {
  private myBlurView: StyleableBlurView;
  private _blurRadius = 16;
  private _effectStyle: BlurViewEffectStyle = BlurViewEffectStyle.LIGHT;
  private _overlayColor: Color = Color.BLACK;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.sliderRadius.on('valueChange', (value) => {
      this._blurRadius = value;
      this.showHideBlurView(true);
    });
    this.btnEffectStyle.on('press', () => this.showPickerEffectStyle());
    this.btnOverlayColor.on('press', () => this.setOverlayColor());
    this.btnShowHide.on('press', () => this.showHideBlurView(this.btnShowHide.text !== 'Show'));
  }

  setOverlayColor() {
    const random = Math.round(Math.random() * 5);
    const colors = [Color.BLUE, Color.CYAN, Color.GREEN, Color.MAGENTA, Color.YELLOW, Color.LIGHTGRAY];
    this._overlayColor = colors[random];
    this.showHideBlurView(true);
  }

  showPickerEffectStyle() {
    const picker = new Picker();
    const items = Object.keys(BlurViewEffectStyle).filter((item) => {
      return isNaN(Number(item));
    });
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('selected: ', index);
      this._effectStyle = BlurViewEffectStyle[items[index]];
      this.showHideBlurView(true);
    });
    picker.show();
  }

  initBlurView() {
    const myBlurView = new StyleableBlurView({
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      positionType: FlexLayout.PositionType.ABSOLUTE
    });
    myBlurView.android.rootView = this.flBlur;
    myBlurView.android.blurRadius = this._blurRadius;
    myBlurView.ios.effectStyle = this._effectStyle;
    myBlurView.android.overlayColor = Color.TRANSPARENT; //This needs to be changed afterwards
    this.myBlurView = myBlurView;
    this.flBlur.addChild(myBlurView, 'myBlurView');
    System.OS === System.OSType.IOS ? this.layout.applyLayout() : this.flBlur.applyLayout();
  }

  showHideBlurView(toggle: boolean) {
    if (!this.myBlurView) {
      return;
    }
    this.flBlur.removeChild(this.myBlurView);
    if (toggle) {
      this.initBlurView();
    }
    this.btnShowHide.text = toggle ? 'Show' : 'Hide';
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    try {
      super.onLoad();
      this.initBlurView();
    } catch (e) {
      console.error(e.message, { stack: e.stack });
    }
  }
}
