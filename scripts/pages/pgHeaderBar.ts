import PgHeaderBarDesign from 'generated/pages/pgHeaderBar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import Image from '@smartface/native/ui/image';
import getRandomColor from 'lib/getRandomColor';
import AttributedString from '@smartface/native/ui/attributedstring';
import Screen from '@smartface/native/device/screen';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

export default class PgHeaderBar extends withDismissAndBackButton(PgHeaderBarDesign) {
  private _visible = true;
  private _transparent = true;
  private _translucent = false;
  private _borderVisibility = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnVisible.on('press', () => this.changeVisibility());
    this.btnTransparent.on('press', () => this.changeTransparent());
    this.btnTranslucent.on('press', () => this.changeTranslucent());
    this.btnTitleLayout.on('press', () => this.setTitleLayout());
    this.btnTitleFont.on('press', () => this.setTitleAndColor());
    this.btnSetSubtitle.on('press', () => this.setSubtitle());
    this.btnSetPadding.on('press', () => this.setPadding());
    this.btnSetLogo.on('press', () => this.setLogo());
    this.btnSetItemColor.on('press', () => this.setItemColor());
    this.btnItems.on('press', () => this.setItems());
    this.btnGetHeight.on('press', () => this.getHeight());
    this.btnSetContentInset.on('press', () => this.setContentInset());
    this.btnSetBorderVisibility.on('press', () => this.changeBorderVisibility());
    this.btnSetBackgroundImage.on('press', () => this.setBackgroundImage());
    this.btnSetAttributed.on('press', () => this.setAttributedStrings());

    this.slElevation.on('valueChange', (value) => this.changeElevation(value));
    this.slAlpha.on('valueChange', (value) => this.changeAlpha(value));
  }

  getHeaderBar() {
    return System.OS === System.OSType.ANDROID ? this.headerBar : this.parentController.headerBar;
  }

  changeAlpha(value) {
    console.info('changeAlpha');
    this.getHeaderBar().alpha = value;
  }

  setItems() {
    console.info('setItems');
    const headerBarItem = new HeaderBarItem({ image: 'images://close_icon.png' });
    this.headerBar.setItems([headerBarItem]);
  }

  generateAttributedString(str: string) {
    const attributeString = new AttributedString();
    attributeString.string = str;
    attributeString.link = 'https://www.google.com/';
    attributeString.strikethrough = true;
    attributeString.backgroundColor = Color.RED;
    attributeString.foregroundColor = Color.GREEN;
    attributeString.underline = true;
    attributeString.font = Font.create('Times New Roman', 30, Font.NORMAL);
    attributeString.ios.underlineColor = Color.BLUE;
    attributeString.ios.strikethroughColor = Color.WHITE;
    return attributeString;
  }

  setAttributedStrings() {
    console.info('setAttributedStrings');
    this.getHeaderBar().android.attributedSubtitle = this.generateAttributedString('subtitle');
    this.getHeaderBar().android.attributedTitle = this.generateAttributedString('title');
  }

  changeElevation(value) {
    console.info('changeElevation');
    this.getHeaderBar().android.elevation = value;
  }

  changeBorderVisibility() {
    console.log('changeBorderVisibility: ', !this._borderVisibility);
    this.getHeaderBar().borderVisibility = !this._borderVisibility;
    this._borderVisibility = !this._borderVisibility;
  }

  getHeight() {
    console.info('getHeight');
    console.info(this.getHeaderBar().height);
  }

  setBackgroundImage() {
    console.info('setBackgroundImage');
    this.getHeaderBar().backgroundImage = Image.createFromFile('images://smartface.png');
  }

  setContentInset() {
    //You need to test this onShow or onLoad
    //Call this function there
    console.info('setContentInset');
    this.getHeaderBar().android.contentInset = { left: 45, right: 30 };
  }

  setItemColor() {
    console.info('setItemColor');
    this.getHeaderBar().itemColor = getRandomColor();
  }

  setLogo() {
    console.info('setLogo');
    this.getHeaderBar().android.logoEnabled = true;
    this.getHeaderBar().android.logo = Image.createFromFile('images://icon.png');
  }

  setPadding() {
    console.info('setPadding');
    this.getHeaderBar().android.padding = { top: 0, left: 32, right: 16, bottom: 0 };
  }

  setSubtitle() {
    console.info('setSubtitle');
    this.getHeaderBar().android.subtitle = 'Subtitle';
    this.getHeaderBar().android.subtitleColor = Color.BLUE;
    this.getHeaderBar().android.subtitleFont = Font.create(Font.DEFAULT, 3);
  }

  setTitleAndColor() {
    console.info('setTitleAndColor');
    this.getHeaderBar().title = 'ExampleTitle';
    this.getHeaderBar().ios.titleFont = Font.create(Font.DEFAULT, 3);
    this.getHeaderBar().titleColor = Color.DARKGRAY;
  }

  setTitleLayout() {
    const customView = new FlexLayout();
    // Necessary for iOS
    customView.height = this.getHeaderBar().height;
    customView.width = Screen.width;
    // Necessary for iOS
    customView.justifyContent = FlexLayout.JustifyContent.CENTER;
    customView.alignItems = FlexLayout.AlignItems.STRETCH;
    customView.alignContent = FlexLayout.AlignContent.STRETCH;
    customView.backgroundColor = Color.GRAY;
    customView.height = 45;
    customView.width = 300;
    const label = new Label({ text: 'TitleLayout', textColor: Color.BLACK, height: 50, width: 100, backgroundColor: Color.RED });
    customView.addChild(label);
    this.headerBar.titleLayout = customView;
  }

  changeVisibility() {
    this.getHeaderBar().visible = !this._visible;
    this._visible = !this._visible;
    console.info('visibility changed to: ', this._visible);
  }

  changeTranslucent() {
    this.getHeaderBar().ios.translucent = !this._translucent;
    this._translucent = !this._translucent;
    console.info('translucent changed to: ', this._translucent);
  }

  changeTransparent() {
    this.getHeaderBar().transparent = !this._transparent;
    this._transparent = !this._transparent;
    console.info('transparent changed to: ', this._transparent);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
