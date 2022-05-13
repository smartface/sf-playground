import PgWebBrowserDesign from 'generated/pages/pgWebBrowser';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import WebBrowser from '@smartface/native/ui/webbrowser';

export default class PgWebBrowser extends withDismissAndBackButton(PgWebBrowserDesign) {
  private _setItemColor = false;
  private _setBarColor = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShowBrowser.on('press', () => this.showBrowser());
    this.swItemColor.on('toggleChanged', (value) => {
      this._setItemColor = value;
    });
    this.swTabColor.on('toggleChanged', (value) => {
      this._setBarColor = value;
    });
  }

  showBrowser() {
    const webBrowser = new WebBrowser({
      url: 'https://smartface.io',
      barColor: this._setBarColor ? Color.RED : null,
      ios: {
        itemColor: this._setItemColor ? Color.BLUE : null
      }
    });
    webBrowser.show(this);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
