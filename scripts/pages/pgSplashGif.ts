import PgSplashGifDesign from "generated/pages/pgSplashGif";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { styleableComponentMixin } from "@smartface/styling-context";
import Dialog from "@smartface/native/ui/dialog";
import GifImage from "@smartface/native/ui/gifimage";
import GifImageView from "@smartface/native/ui/gifimageview";
import FlexLayout from "@smartface/native/ui/flexlayout";
import Screen from "@smartface/native/device/screen";
import Color from "@smartface/native/ui/color";

class StyleableGifImageView extends styleableComponentMixin(GifImageView) {}

export default class PgSplashGif extends withDismissAndBackButton(PgSplashGifDesign) {
  myDialog: Dialog;
  myGifImage: GifImage;
  myGifImageView: StyleableGifImageView;
  pages: any;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.myDialog.show();
    setTimeout(() => {
      this.myDialog.hide();
      this.router.push("/root/btb/tab2/PgListViewIndex");
    }, 5000);
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.myDialog = new Dialog({
      android: {
        themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
      },
    });
    this.myDialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
    this.myDialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
    this.myDialog.layout.backgroundColor = Color.create("#00a1f1");
    console.log("screenwidth,ssaasd", Screen.width, Screen.height);
    this.myGifImage = GifImage.createFromFile("assets://smartface_splash.gif");
    this.myGifImageView = new StyleableGifImageView({
      gifImage: this.myGifImage,
    });
    this.myDialog.layout.addChild(this.myGifImageView);
    this.myDialog.layout.applyLayout();
  }
}
