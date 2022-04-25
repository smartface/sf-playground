import PgBlurViewDesign from 'generated/pages/pgBlurView';
import BlurView from '@smartface/native/ui/blurview';
import FlexLayout from '@smartface/native/ui/flexlayout';
import ImageView from '@smartface/native/ui/imageview';
import Screen from '@smartface/native/device/screen';
import Image from '@smartface/native/ui/image';
import Button from '@smartface/native/ui/button';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';

class StyleableBlurView extends styleableComponentMixin(BlurView) {}
class StyleableButton extends styleableComponentMixin(Button) {}
class StyleableImageView extends styleableComponentMixin(ImageView) {}

export default class PgBlurView extends withDismissAndBackButton(PgBlurViewDesign) {
  private imgSmartface: StyleableImageView;
  private myButton: StyleableButton;
  private myBlurView: StyleableBlurView;
  private isShown = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  // The page design has been made from the code for better
  // showcase purposes. As a best practice, remove this and
  // use WYSIWYG editor to style your pages.
  centerizeTheChildrenLayout() {
    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          flexDirection: 'ROW',
          justifyContent: 'FLEX_END',
          alignItems: 'FLEX_END'
        }
      }
    });
  }

  initImageView() {
    const imgSmartface = new StyleableImageView({
      top: 0,
      right: 0,
      left: 0,
      bottom: Screen.height / 2,
      positionType: FlexLayout.PositionType.ABSOLUTE,
      imageFillType: ImageView.FillType.ASPECTFIT
    });
    this.imgSmartface = imgSmartface;
    this.addChild(imgSmartface);
    imgSmartface.image = Image.createFromFile('images://smartface.png');
  }
  initBlurView() {
    const myBlurView = new StyleableBlurView({
      top: 0,
      right: 0,
      left: 0,
      bottom: Screen.height / 2,
      positionType: FlexLayout.PositionType.ABSOLUTE
    });
    myBlurView.android.rootView = this.layout;
    this.myBlurView = myBlurView;
    this.addChild(myBlurView, 'myBlurView');
  }
  initButton() {
    const myButton = new StyleableButton({
      text: 'Show',
      flexGrow: 1
    });
    this.myButton = myButton;
    this.addChild(myButton, 'myButton', '.sf-button');
    myButton.onPress = () => {
      this.removeChild(this.myBlurView);
      if (this.isShown) {
        this.addChild(this.myBlurView, 'myBlurView');
      }
      this.myButton.text = this.isShown ? 'Show' : 'Hide';
      this.isShown = !this.isShown;
      this.layout.applyLayout();
    };
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.centerizeTheChildrenLayout();

    this.initImageView();
    this.initBlurView();
    this.initButton();
  }
}
