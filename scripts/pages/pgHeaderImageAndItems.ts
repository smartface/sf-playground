import PgHeaderImageAndItemsDesign from 'generated/pages/pgHeaderImageAndItems';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Color from '@smartface/native/ui/color';
import { themeService } from 'theme';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Router from '@smartface/router/lib/router/Router';
import AttributedString from '@smartface/native/ui/attributedstring';
import Font from '@smartface/native/ui/font';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Label from '@smartface/native/ui/label';

export default class PgHeaderImageAndItems extends withDismissAndBackButton(PgHeaderImageAndItemsDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButtonClicks() {
    this.btnDirectImage.onPress = () => this.addHeaderWithDirectImage();
    this.btnStyle.onPress = () => this.addHeaderWithGetNativeStyle();
    this.btnAttributedTitle.onPress = () => this.addAttributedTitleToHeaderBarItem();
    this.btnBadge.onPress = () => this.addHeaderWithBadge();
    this.btnText.onPress = () => this.addHeaderWithText();
    this.btnCustom.onPress = () => this.addHeaderWithCustomView();
  }

  addHeaderWithDirectImage() {
    console.log('addHeaderWithDirectImage');
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.onPress = () => console.log('press imageHeaderBarItem');
    imageHeaderBarItem.image = 'images://smartface.png';
    imageHeaderBarItem.color = Color.BLACK; // For Android
    /**
     * Alternative usage :
     * imageHeaderBarItem.image = Image.createFromFile('images://smartface.png');
     */
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  addAttributedTitleToHeaderBarItem() {
    console.log('addAttributedTitleToHeaderBarItem');
    const attributedTitleToHeaderBarItem = new HeaderBarItem();
    attributedTitleToHeaderBarItem.onPress = () => console.log('press attributedTitleToHeaderBarItem');
    this.headerBar.setItems([attributedTitleToHeaderBarItem]);
    attributedTitleToHeaderBarItem.android.attributedTitle = new AttributedString({
      string: 'click',
      font: Font.create('Times New Roman', 30, Font.NORMAL),
      foregroundColor: Color.GREEN,
      strikethrough: true
    });
    console.log(attributedTitleToHeaderBarItem.size);
  }

  addHeaderWithGetNativeStyle() {
    console.log('addHeaderWithGetNativeStyle');
    const imageHeaderBarItem = new HeaderBarItem();
    imageHeaderBarItem.onPress = () => console.log('press imageHeaderBarItem');
    imageHeaderBarItem.image = themeService.getNativeStyle('#pgHeaderImageAndItems').image;
    this.headerBar.setItems([imageHeaderBarItem]);
  }

  addHeaderWithText() {
    console.log('addHeaderWithText');
    const textHeaderBarItem = new HeaderBarItem();
    textHeaderBarItem.onPress = () => console.log('press textHeaderBarItem');
    textHeaderBarItem.title = 'Title';
    textHeaderBarItem.color = Color.BLUE;
    this.headerBar.setItems([textHeaderBarItem]);
  }

  addHeaderWithCustomView() {
    console.log('addHeaderWithCustomView');
    const customHeaderBarItem = new HeaderBarItem();
    const customView = new FlexLayout();
    customView.flexDirection = FlexLayout.FlexDirection.ROW;
    customView.justifyContent = FlexLayout.JustifyContent.CENTER;
    customView.alignItems = FlexLayout.AlignItems.CENTER;
    const label = new Label({ text: 'Custom' });
    label.height = 50;
    customView.addChild(label);
    customHeaderBarItem.customView = customView;
    customHeaderBarItem.onPress = () => console.log('press customHeaderBarItem');
    this.headerBar.setItems([customHeaderBarItem]);
  }

  addHeaderWithBadge() {
    console.log('addHeaderWithBadge');
    const badgeHeaderBarItem = new HeaderBarItem();
    this.headerBar.setItems([badgeHeaderBarItem]);
    badgeHeaderBarItem.onPress = () => console.log('press badgeHeaderBarItem');
    badgeHeaderBarItem.badge.visible = true;
    badgeHeaderBarItem.badge.text = '3';
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
