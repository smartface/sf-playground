import PgSSLPinningDesign from "generated/pages/pgSSLPinning";
import FlexLayout from "@smartface/native/ui/flexlayout";
import Application from "@smartface/native/application";
import WebView from "@smartface/native/ui/webview";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";


//You should create new Page from UI-Editor and extend with it.
export default class PgSSLPinning extends withDismissAndBackButton(PgSSLPinningDesign) {
  myWebView: WebView;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
    this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
    this.layout.alignItems = FlexLayout.AlignItems.CENTER;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    const { headerBar } = this;
    Application.statusBar.visible = false;
    headerBar.visible = false;
  }

  onLoad() {
    super.onLoad();
    this.myWebView = new WebView({
      ios: {
        sslPinning: [
          {
            host: "httpbin.org",
            certificates: [],
            validateCertificateChain: true,
            validateHost: true,
          },
        ],
      },
      onChangedURL: function (event: any) {
        console.log("Event Change URL: " + event.url);
        return true;
      },
      onError: function (event: any) {
        console.error("Event Error : " + event.message + ", URL: " + event.url);
      },
      onLoad: function (event: any) {
        console.info("Event Load: " + event.url);
      },
      onShow: function (event: any) {
        console.warn("Event Show: " + event.url);
      },
    });

    this.myWebView.android.page = this;

    this.myWebView.loadURL("https://httpbin.org");

    setTimeout(() => {
      this.myWebView.ios.sslPinning = undefined;
      this.myWebView.loadURL("https://www.smartface.io");
    }, 5000);

    //@ts-ignore
    this.layout.addChild(this.myWebView, "myWebView", ".sf-webView", {
      left: 10,
      top: 10,
      right: 10,
      bottom: 10,
      flexProps: {
        positionType: "ABSOLUTE",
      },
    });
  }
}
