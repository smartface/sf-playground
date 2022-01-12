import PgButtonPressDesign from "generated/pages/pgButtonPress";
import WebViewBridge from "@smartface/extension-utils/lib/webviewbridge";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgButtonPress extends withDismissAndBackButton(PgButtonPressDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initWebViewBridge() {
    const url = "https://az793023.vo.msecnd.net/examples/webviewbridge/buttonevent.html";
    const script = `
            const btn = document.getElementById("btn");
            btn.onclick = function() {
            window.boubleEvent("buttonPress");
            };
        `;

    //Within constructor
    const wvb = new WebViewBridge({
      webView: this.webView1, //WebView. Should be assigned from UI editor.
      source: url,
    });
    wvb.on("buttonPress", (data) => {
      const text = "Button pressed";
      console.info(text);
      alert(text);
      //Do your own logic
    });

    wvb.ready().then(() => {
      wvb.evaluateJS(script);
    });
  }
  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }
  onLoad() {
    super.onLoad();
    this.initWebViewBridge();
  }
}
