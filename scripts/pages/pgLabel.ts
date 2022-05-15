import PgLabelDesign from 'generated/pages/pgLabel';
import Application from '@smartface/native/application';
import ImageView from '@smartface/native/ui/imageview';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import System from '@smartface/native/device/system';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Label from '@smartface/native/ui/label';
import { withDismissAndBackButton } from '@smartface/mixins';
import TextDirection from '@smartface/native/ui/shared/textdirection';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import Font from '@smartface/native/ui/font';
import EllipsizeMode from '@smartface/native/ui/shared/ellipsizemode';

class StyleableLabel extends styleableComponentMixin(Label) {}

export default class PgLabel extends withDismissAndBackButton(PgLabelDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initLabels() {
    this.myLabel.text = 'About Phone';
    this.myLabel.textAlignment = TextAlignment.MIDLEFT;
    this.myLabel.font = Font.create(Font.DEFAULT, 16);

    this.myLabel1.text = `This text should automatically size itself to fit this cell: ${System.OS}`;
    this.myLabel1.android.textDirection = TextDirection.LTR;
    this.myLabel1.maxLines = 0;
    this.myLabel1.adjustFontSizeToFit = true;

    this.textLabel.text = 'Software Upload - long text to overflow to second line more text added.';
    this.textLabel.textAlignment = TextAlignment.MIDRIGHT;
    this.textLabel.on('touch', () => alert('Upload Operation System'));

    this.myLabel2.text = 'General Settings Overflow text multiline should be shown in screen. Here we go!';
    this.myLabel2.textAlignment = TextAlignment.MIDRIGHT;
    this.myLabel2.maxLines = 0;

    this.ellipsizeLabelCharWrapping.ellipsizeMode = EllipsizeMode.CHARWRAPPING;
    this.ellipsizeLabelEnd.ellipsizeMode = EllipsizeMode.END;
    this.ellipsizeLabelMiddle.ellipsizeMode = EllipsizeMode.MIDDLE;
    this.ellipsizeLabelNone.ellipsizeMode = EllipsizeMode.NONE;
    this.ellipsizeLabelStart.ellipsizeMode = EllipsizeMode.START;
    this.ellipsizeLabelWordWrapping.ellipsizeMode = EllipsizeMode.WORDWRAPPING;
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.initLabels();
  }
}
