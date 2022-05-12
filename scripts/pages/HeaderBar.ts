import PgHeaderBarDesign from 'generated/pages/HeaderBar';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import Image from '@smartface/native/ui/image';
import getRandomColor from 'lib/getRandomColor';
import { SliderEvents } from '@smartface/native/ui/slider/slider-events';
import AttributedString from '@smartface/native/ui/attributedstring';

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
    this.btnGetHeight.on('press', () => this.getHeight());
    this.btnSetContentInset.on('press', () => this.setContentInset());
    this.btnSetBorderVisibility.on('press', () => this.changeBorderVisibility());
    this.btnSetBackgroundImage.on('press', () => this.setBackgroundImage());
    this.btnSetAttributed.on('press', () => this.setAttributedStrings());

    this.slElevation.on(SliderEvents.ValueChange, (value) => this.changeElevation(value));
    this.slAlpha.on(SliderEvents.ValueChange, (value) => this.changeAlpha(value));
  }

  getHeaderBar() {
    return System.OS === System.OSType.ANDROID ? this.headerBar : this.parentController.headerBar;
  }

  changeAlpha(value) {
    console.info('changeAlpha');
    this.getHeaderBar().alpha = value;
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
    this.headerBar.android.attributedSubtitle = this.generateAttributedString('subtitle');
    this.headerBar.android.attributedTitle = this.generateAttributedString('title');
  }

  changeElevation(value) {
    console.info('changeElevation');
    this.headerBar.android.elevation = value;
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
    console.info('setContentInset');
    this.headerBar.android.contentInset = { left: 30, right: 30 };
  }

  setItemColor() {
    console.info('setItemColor');
    this.getHeaderBar().itemColor = getRandomColor();
    this.getHeaderBar().backgroundColor = getRandomColor();
  }

  setLogo() {
    console.info('setLogo');
    this.headerBar.android.logoEnabled = true;
    this.headerBar.android.logo = Image.createFromFile('images://icon.png');
  }

  setPadding() {
    console.info('setPadding');
    this.headerBar.android.padding = { top: 0, left: 32, right: 16, bottom: 0 };
  }

  setSubtitle() {
    console.info('setSubtitle');
    this.headerBar.android.subtitle = 'Subtitle';
    this.headerBar.android.subtitleColor = Color.BLUE;
    this.headerBar.android.subtitleFont = Font.create(Font.DEFAULT, 3);
  }

  setTitleAndColor() {
    console.info('setTitleAndColor');
    this.headerBar.title = 'ExampleTitle';
    this.headerBar.ios.titleFont = Font.create(Font.DEFAULT, 3);
    this.getHeaderBar().titleColor = Color.DARKGRAY;
  }

  setTitleLayout() {
    const customView = new FlexLayout();
    customView.justifyContent = FlexLayout.JustifyContent.CENTER;
    customView.alignItems = FlexLayout.AlignItems.STRETCH;
    customView.alignContent = FlexLayout.AlignContent.STRETCH;
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
