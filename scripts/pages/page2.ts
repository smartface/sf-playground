import HeaderBarItem = require("@smartface/native/ui/headerbaritem");
import touch = require("@smartface/extension-utils/lib/touch");
import Image = require("@smartface/native/ui/image");
import PageTitleLayout from "components/PageTitleLayout";
import Color = require("@smartface/native/ui/color");
import System = require("@smartface/native/device/system");
import Page2Design from "generated/pages/page2";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { backButtonImage } from "lib/constants/style";

export default class Page2 extends withDismissAndBackButton(Page2Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    touch.addPressEvent(this.btnSayHello, () => {
      alert("Hello World!");
    });
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    const { routeData, headerBar } = this;
    headerBar.titleLayout.applyLayout();
    routeData && console.info(routeData.message);
    this.initBackButton(this.router);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    var headerBar;
    this.headerBar.titleLayout = new PageTitleLayout();
    this.headerBar.setItems([
      new HeaderBarItem({
        title: "Option",
        onPress: () => {
          console.warn("You pressed Option item!");
        },
      }),
    ]);
    if (System.OS === "Android") {
      headerBar = this.headerBar;
      headerBar.setLeftItem(
        new HeaderBarItem({
          onPress: () => {
            this.router.goBack();
          },
          image: Image.createFromFile("images://arrow_back.png"),
        })
      );
    } else {
      headerBar = this.parentController.headerBar;
    }
    headerBar.itemColor = Color.WHITE;
  }
}
