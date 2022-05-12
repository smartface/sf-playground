import PgStatusBarDesign from 'generated/pages/StatusBar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { StatusBarStyle } from '@smartface/native/application/statusbar/statusbar';

export default class PgStatusBar extends withDismissAndBackButton(PgStatusBarDesign) {
  private _transparent = true;
  private _visible = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnGetHeight.on('press', () => this.getHeight());
    this.btnDefault.on('press', () => this.setDefaultStyle());
    this.btnLightContent.on('press', () => this.setDefaultLightContent());
    this.btnSetTransparent.on('press', () => this.changeTransparent());
    this.btnSetVisible.on('press', () => this.changeVisible());
  }

  getHeight() {
    const height = this.statusBar.height;
    console.info(height, 'a');
    this.lblHeight.text = height ? this.statusBar.height?.toString() : `couldn't get height`;
  }

  setDefaultStyle() {
    this.statusBar.style = StatusBarStyle.DEFAULT;
  }

  setDefaultLightContent() {
    this.statusBar.style = StatusBarStyle.LIGHTCONTENT;
  }

  changeVisible() {
    this.statusBar.visible = !this._visible;
    this._visible = !this._visible;
    this.btnSetTransparent.text = this._visible ? 'Set Visible False' : 'Set Visible True';
  }

  changeTransparent() {
    this.statusBar.android.transparent = !this._transparent;
    this._transparent = !this._transparent;
    this.btnSetTransparent.text = this._transparent ? 'Set Transparent False (Android)' : 'Set Transparent True (Android)';
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onHide() {}

  onLoad() {
    super.onLoad();
  }
}
