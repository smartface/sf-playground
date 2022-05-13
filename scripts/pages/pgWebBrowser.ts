import PgWebBrowserDesign from 'generated/pages/pgWebBrowser';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import { IWebBrowserOptions } from '@smartface/native/ui/webbrowser/webbrowser';
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
    let options = {
      url: 'https://smartface.io',
      ios: {}
    } as Partial<IWebBrowserOptions>;
    if (this._setBarColor) {
      options.barColor = Color.RED;
    }
    if (this._setItemColor) {
      options.ios = { itemColor: Color.BLUE };
    }
    console.info('options', options);
    const webBrowser = new WebBrowser(options);
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
