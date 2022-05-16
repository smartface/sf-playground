import Screen from '@smartface/native/device/screen';
import Font from '@smartface/native/ui/font';
import LviDynamicLineDesign from 'generated/my-components/LviDynamicLine';
import { themeService } from 'theme';
const LineFont: Font = themeService.getNativeStyle('.lviDynamicLine-lblLine').font;
const { paddingLeft, paddingRight, paddingTop, paddingBottom } = themeService.getNativeStyle('.lviDynamicLine');

export default class LviDynamicLine extends LviDynamicLineDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  set text(value: string) {
    this.lblLine.text = value;
  }
  static getHeight(text: string) {
    /**
     * Below is our listview item's blueprint
     * To calculate text height we need to add paddingBottom and paddingTop first
     * After that calculation we have to calculate the height of the text. We need to consider
     * MaxWidth of the area that this text needs to fit.
     * Our listview is %100 fitted to screen so Screen.width is our parent layout width.
     * We have to remove paddingLeft and paddingRight from this value because label have those.
     *   ___________________________________________________________________________________________________
     *  |                                                                                                   | => PaddingTop
     *  |                   _____________________________________________________________                   | => PaddingTop
     *  |                  |                                                             |                  |
     *  |  < paddingLeft > |                                                             | < paddingRight > |
     *  |  < paddingLeft > |                                                             | < paddingRight > |
     *  |                  |_____________________________________________________________|                  |
     *  |                                                                                                   | => PaddingBottom
     *  |___________________________________________________________________________________________________| => PaddingBottom
     *
     *
     */
    return paddingTop + paddingBottom + LineFont.sizeOfString(text, Screen.width - (paddingLeft + paddingRight)).height;
  }
}
