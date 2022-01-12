import PgHeaderImageDesign from "generated/pages/pgHeaderImage";
import HeaderBarItem from "@smartface/native/ui/headerbaritem";
import Color from "@smartface/native/ui/color";
import { themeService } from "theme";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import Router from "@smartface/router/lib/router/Router";
import { backButtonImage } from "lib/constants/style";

export default class PgHeaderImage extends withDismissAndBackButton(PgHeaderImageDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButtonClicks() {
    this.btnDirectImage.onPress = () => this.addHeaderWithDirectImage();
    this.btnStyle.onPress = () => this.addHeaderWithGetCombinedStyle();
  }
  addHeaderWithDirectImage() {
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.image = "images://smartface.png";
    imageHeaderBarItem.color = Color.BLACK; // For Android
    /**
     * Alternative usage :
     * imageHeaderBarItem.image = Image.createFromFile('images://smartface.png');
     */
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  addHeaderWithGetCombinedStyle() {
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.image = themeService.getStyle("#pgHeaderImage").image;
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
    this.initButtonClicks();
  }
}
