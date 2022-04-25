import PgHeaderImageDesign from 'generated/pages/pgHeaderImage';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Color from '@smartface/native/ui/color';
import { themeService } from 'theme';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Router from '@smartface/router/lib/router/Router';

export default class PgHeaderImage extends withDismissAndBackButton(PgHeaderImageDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButtonClicks() {
    this.btnDirectImage.onPress = () => this.addHeaderWithDirectImage();
    this.btnStyle.onPress = () => this.addHeaderWithGetNativeStyle();
  }
  addHeaderWithDirectImage() {
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.image = 'images://smartface.png';
    imageHeaderBarItem.color = Color.BLACK; // For Android
    /**
     * Alternative usage :
     * imageHeaderBarItem.image = Image.createFromFile('images://smartface.png');
     */
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  addHeaderWithGetNativeStyle() {
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.image = themeService.getNativeStyle('#pgHeaderImage').image;
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initButtonClicks();
  }
}
