import PgWebBrowserDesign from 'generated/pages/pgWebBrowser';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import WebBrowser from '@smartface/native/ui/webbrowser';
import Color from '@smartface/native/ui/color';
import { ButtonType } from '@smartface/native/ui/alertview/alertview';

export default class PgWebBrowser extends withDismissAndBackButton(PgWebBrowserDesign) {
  private webOptions;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShowBrowser.on('press', () => this.initWebBrowser());
  }

  initWebBrowser() {
    this.webOptions = new WebBrowser.Options();
    this.webOptions.url = 'https://smartface.io';
    this.webOptions.barColor = Color.create('#00A1F1');
    this.webOptions.ios.itemColor = Color.WHITE;
    this.webOptions.ios.statusBarVisible = true;
    WebBrowser.show(this, this.webOptions);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
