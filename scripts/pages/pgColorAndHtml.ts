import PgColorAndHtmlDesign from 'generated/pages/pgColorAndHtml';
import Color from '@smartface/native/ui/color';
import colorUtil from '@smartface/extension-utils/lib/color';
import generateGuid from '@smartface/extension-utils/lib/guid';
import { createAttributedStrings, createAttributedTexts } from '@smartface/extension-utils/lib/html-to-text';
import AttributedString from '@smartface/native/ui/attributedstring';
import propFactory from '@smartface/contx/lib/smartface/sfCorePropFactory';
import { themeService } from 'theme';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router } from '@smartface/router';
import Font from '@smartface/native/ui/font';

const exampleHtml =
  '<span style="font-size: 24px; color: rgb(0, 0, 0); text-decoration-color: rgb(0, 0, 0);"><span style="font-family: Nunito-LightItalic; font-size: 24px; background-color: transparent; color: rgb(0, 0, 0); text-decoration-color: rgb(0, 0, 0);">Your </span><font face="ios-Default-Bold" style="font-size: 24px; font-family: ios-Default-Regular; background-color: transparent; color: rgb(0, 0, 0); text-decoration-color: rgb(0, 0, 0);">attributed </font><span style="text-decoration-line: underline; color: rgb(139, 87, 42); font-size: 24px; font-family: ios-Default-Regular; background-color: transparent; text-decoration-color: rgb(0, 0, 0);">Stri<span style="color: rgb(139, 87, 42); text-decoration-line: underline ; text-decoration-color: rgb(0, 0, 0); font-size: 24px; font-family: ios-Default-Regular; background-color: transparent;">ngs</span></span></span><div><span style="font-size: 16px; font-family: ios-Default-Regular; text-decoration-color: rgb(0, 0, 0);"><span style="text-decoration-line: underline; font-size: 16px; font-family: ios-Default-Regular; text-decoration-color: rgb(0, 0, 0);"><span style="text-decoration-line: underline; text-decoration-color: rgb(0, 0, 0); font-size: 24px; font-family: ios-Default-Regular; background-color: rgb(189, 16, 224);">second</span></span></span></div><div><span style="font-size: 16px; font-family: ios-Default-Regular; text-decoration-color: rgb(0, 0, 0);"><span style="text-decoration-line: underline; font-size: 16px; font-family: ios-Default-Regular; text-decoration-color: rgb(0, 0, 0);"><span style="text-decoration-line: underline; text-decoration-color: rgb(0, 0, 0); font-size: 16px; font-family: ios-Default-Regular; background-color: rgb(189, 16, 224); color: rgb(248, 231, 28);">Third</span></span></span></div>';

export default class PgColorAndHtml extends withDismissAndBackButton(PgColorAndHtmlDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initTouchButton() {
    this.flTouch.on('touch', () => console.log('pressed'));
  }

  initTextBoxes() {
    this.tbR.onTextChanged = this.onRgbTextBoxTextChanged.bind(this);
    this.tbG.onTextChanged = this.onRgbTextBoxTextChanged.bind(this);
    this.tbB.onTextChanged = this.onRgbTextBoxTextChanged.bind(this);
    this.onRgbTextBoxTextChanged();
  }

  onRgbTextBoxTextChanged() {
    const r = parseInt(this.tbR.text) || 0;
    const g = parseInt(this.tbG.text) || 0;
    const b = parseInt(this.tbB.text) || 0;
    const color = Color.create(r, g, b);
    const colorValues = this.getColorValues(color as any);
    this.updateRgbTextBoxes(r, g, b);
    this.updateRgbLabels(colorValues);
  }

  getColorValues(color: Color) {
    const rgb = colorUtil.rgb(color);
    const rgba = colorUtil.rgba(color);
    const argb = colorUtil.argb(color);
    const tinycolor = colorUtil.tinycolor(color);
    return {
      rgb,
      rgba,
      argb,
      tinycolor
    };
  }

  updateRgbLabels(values: { rgb: string; rgba: string; argb: string; tinycolor: string }) {
    const { rgb, rgba, argb, tinycolor } = values;
    this.lblValueRgb.text = '#' + rgb;
    this.lblValueRgba.text = '#' + rgba;
    this.lblValueArgb.text = '#' + argb;
    this.lblValueTinyColor.text = tinycolor;
  }

  updateRgbTextBoxes(r: number, g: number, b: number) {
    this.tbR.text = r.toString();
    this.tbG.text = g.toString();
    this.tbB.text = b.toString();
  }

  initGuid() {
    this.lblGuid.onTouch = () => {
      this.createAndUpdateGuid();
      return true;
    };
    this.createAndUpdateGuid();
  }

  createAndUpdateGuid() {
    const guid = generateGuid();
    this.lblGuid.text = guid;
  }

  initHtml() {
    this.taHtml.text = exampleHtml;
    this.btnAttrTexts.onTouch = () => {
      this.createAndShowAttributedTexts();
      return false;
    };
    this.btnAttrStr.onTouch = () => {
      this.createAndShowAttributedStrs();
      return false;
    };
  }

  createAndShowAttributedTexts() {
    const attributedStrings = createAttributedTexts(this.taHtml.text);
    console.log('createAndShowAttributedTexts: ', attributedStrings);
    this.tvHtml.attributedText = attributedStrings;
  }

  createAndShowAttributedStrs() {
    const attributedStrings = createAttributedStrings(this.taHtml.text);
    console.log('createAndShowAttributedStrs: ', attributedStrings);
    this.tvHtml.attributedText = attributedStrings.map((s) => new AttributedString(propFactory(s)));
  }

  initGetNativeStyle() {
    const { backgroundColor } = themeService.getNativeStyle('.getNativeStyleTest');
    this.btnGetNativeStyle.backgroundColor = backgroundColor;
  }

  initNativeTypescriptTest() {
    // AttributedString & Color TEST
    const attributeString = new AttributedString();
    attributeString.string = ' Third - AttributedString';
    attributeString.link = 'https://www.google.com/';
    attributeString.strikethrough = true;
    attributeString.backgroundColor = Color.RED;
    attributeString.foregroundColor = Color.GREEN;
    attributeString.underline = true;
    attributeString.font = Font.create('Times New Roman', 30, Font.NORMAL);
    attributeString.ios.underlineColor = Color.BLUE;
    attributeString.ios.strikethroughColor = Color.WHITE;
    this.tvAttrString.attributedText = [attributeString];
    this.tvAttrString.on('linkClick', () => {
      console.log('Textview LinkClick test');
    });
    this.btnGradientColor.backgroundColor = Color.createGradient({
      direction: Color.GradientDirection.DIAGONAL_LEFT,
      startColor: Color.RED,
      endColor: Color.BLACK
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }
  onLoad() {
    super.onLoad();
    this.initTouchButton();
    this.initTextBoxes();
    this.initGuid();
    this.initHtml();
    this.initGetNativeStyle();
    this.initNativeTypescriptTest();
  }
}
