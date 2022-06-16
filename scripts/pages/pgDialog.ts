import PgDialogDesign from 'generated/pages/pgDialog';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Dialog from '@smartface/native/ui/dialog';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { styleableComponentMixin, StyleContextComponentType, styleableContainerComponentMixin } from '@smartface/styling-context';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
class StyleableActivityIndicator extends styleableComponentMixin(ActivityIndicator) { }


import View from "@smartface/native/ui/view";
import Color from '@smartface/native/ui/color';
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) { }
class StyleableView extends styleableComponentMixin(View) { }


export default class PgDialog extends withDismissAndBackButton(PgDialogDesign) {
  dialog: Dialog;
  private _isTransparent = false;
  private _cancelable = false;
  activityIndicator: StyleableActivityIndicator;

  myView: StyleableView;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.swTransparent.on('toggleChanged', (value) => {
      this._isTransparent = value;
      this.initDialog();
    });
    this.swCancelable.on('toggleChanged', (value) => {
      this._cancelable = value;
      this.initDialog();
    });
    this.btnShow.on('press', () => {
      this.dialog.show();

      setTimeout(() => {
        const view = new StyleableView({
          width: 250,
          // flexGrow: 1,
          height: 200,
          backgroundColor: Color.create("#00A1F1")
        });
  
        this.dialog.layout.addChild(view);
      }, 3000);

      setTimeout(() => {
        this.dialog.hide();
      }, 8000);
    });
    this.btnHide.on('press', () => this.dialog.hide());
  }
  initDialog() {
    console.log('dialog initializing | isTransparent: ', this._isTransparent, ' cancelable: ', this._cancelable);
    this.dialog = new Dialog({
      android: {
        themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
        isTransparent: this._isTransparent,
        cancelable: this._cancelable
      }
    });
    this.dialog.android.isTransparent = this._isTransparent;
    this.dialog.android.cancelable = this._cancelable;
    this.dialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
    this.dialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
    this.activityIndicator = new StyleableActivityIndicator();
    this.activityIndicator.on('touch', () => this.dialog.hide());


    this.dialog.layout.addChild(this.activityIndicator);

    // setTimeout(() => {

    //   const view = new StyleableView({
    //     width: 250,
    //     // flexGrow: 1,
    //     height: 200,
    //     backgroundColor: Color.create("#00A1F1")
    //   });

    //   this.dialog.layout.addChild(view);
    // }, 3000);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initDialog();
  }

  onLoad() {
    super.onLoad();
  }
}
