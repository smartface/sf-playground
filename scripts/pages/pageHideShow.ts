import PageHideShowDesign from "generated/pages/pageHideShow";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { backButtonImage } from "lib/constants/style";

export default class PageHideShow extends withDismissAndBackButton(PageHideShowDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initComponents() {
    this.btnHide.onPress = () => {
      this.webView1.evaluateJS('document.getElementById("item").style.display="none";', () => {});
    };
    this.btnShow.onPress = () => {
      this.webView1.evaluateJS('document.getElementById("item").style.display="flex";', () => {});
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.webView1.loadURL("https://az793023.vo.msecnd.net/examples/sf-core/webview/hide-show.html");
  }

  onLoad() {
    super.onLoad();
    this.headerBar.title = "Hide Show";
    this.initComponents();
  }
}
