import PgIconDesign from 'generated/pages/pgIcon';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Icon from '@smartface/native/ui/icon';
import { styleableComponentMixin } from '@smartface/styling-context';

class StyleableIcon extends styleableComponentMixin(Icon) {}

export default class PgIcon extends withDismissAndBackButton(PgIconDesign) {
  iconGlyph: StyleableIcon;
  iconUnicode: StyleableIcon;
  iconText: StyleableIcon;
  iconEdit: StyleableIcon;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.iconGlyph = new Icon();
    this.iconUnicode = new Icon();
    this.iconText = new Icon();
    this.iconEdit = new Icon();
  }

  initGlyph() {
    this.iconGlyph.glyph = '';
    this.flGlyphWrapper.addChild(this.iconGlyph, 'iconGlyph','#pgIcon-icon');
  }

  initUnicode() {
    this.iconUnicode.unicode = '\uF3A5';
    this.fllUnicodeWrapper.addChild(this.iconUnicode, 'iconUnicode','#pgIcon-icon');
  }

  initText() {
    this.iconText.text = 'calendar-minus';
    this.flTextWrapper.addChild(this.iconText, 'iconText','#pgIcon-icon');
  }

  initIconEdit() {
    this.flIconEditWrapper.addChild(this.iconEdit, 'iconEdit', '#pgIcon-iconEdit')
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    
    this.tbIconEdit.on('textChanged', (e) => {
      this.iconEdit.text = this.tbIconEdit.text;
    })
  }

  onHide() {
    this.tbIconEdit.off('textChanged', () => {});
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initText();
    this.initGlyph();
    this.initUnicode();
    this.initIconEdit();
  }
}
