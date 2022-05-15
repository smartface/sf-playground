import PgMaterialTextBoxDesign from 'generated/pages/pgMaterialTextBox';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import MaterialTextBox from '@smartface/native/ui/materialtextbox';
import { styleableComponentMixin } from '@smartface/styling-context';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Font from '@smartface/native/ui/font';
class StyleableMaterialTextBox extends styleableComponentMixin(MaterialTextBox) {}

const NORMAL_FONT = {
  font: {
    size: 16,
    bold: false,
    italic: false,
    family: 'SFProText',
    style: 'Semibold'
  }
};
const TB_HEIGHT_ANDROID = 85;
const isIOS = System.OS === System.OSType.IOS;

const materialtextboxOptions = Object.assign(
  {
    font: NORMAL_FONT,
    labelsFont: NORMAL_FONT,
    borderWidth: 0
  },
  isIOS ? {} : { height: TB_HEIGHT_ANDROID }
);

export default class PgMaterialTextBox extends withDismissAndBackButton(PgMaterialTextBoxDesign) {
  private mtbExample: StyleableMaterialTextBox;
  private mtbMultiline: StyleableMaterialTextBox;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnSetCharacterRestrictionColor.on('press', () => this.setCharacterRestrictionColor());
    this.btnSetClearButtonColor.on('press', () => this.setClearButtonColor());
    this.btnSetCharacterRestriction.on('press', () => this.setCharacterRestriction());
    this.btnSetEnableCharacterRestriction.on('press', () => this.changeCharacterRestriction());
    this.btnSetErrorMessage.on('press', () => this.setErrorMessage());
    this.btnSetLeftLayout.on('press', () => this.setLeftLayout());
    this.btnSetRightLayout.on('press', () => this.setRightLayout());
  }

  setRightLayout() {
    const view = new FlexLayout({
      flexGrow: 1,
      backgroundColor: Color.BLUE
    });
    this.mtbExample.rightLayout = {
      view,
      width: 40,
      height: 20
    };
  }

  setLeftLayout() {
    const view = new FlexLayout({
      flexGrow: 1,
      backgroundColor: Color.BLUE
    });
    this.mtbExample.ios.leftLayout = {
      view,
      width: 40,
      height: 20
    };
    this.mtbExample.ios.leftLayoutRightPadding = 40;
  }

  setErrorMessage() {
    this.mtbExample.errorMessage = 'Error message example';
    const random = Math.round(Math.random() * 5);
    const colors = [Color.BLUE, Color.CYAN, Color.GREEN, Color.MAGENTA, Color.YELLOW, Color.LIGHTGRAY];
    this.mtbExample.errorColor = colors[random];
  }

  changeCharacterRestriction() {
    const current = this.mtbExample.android.enableCharacterRestriction;
    this.mtbExample.android.enableCharacterRestriction = !current;
    this.btnSetEnableCharacterRestriction.text = !current ? 'Disable Character Restriction' : 'Enable Character Restriction';
  }

  setClearButtonColor() {
    const random = Math.round(Math.random() * 5);
    const colors = [Color.BLUE, Color.CYAN, Color.GREEN, Color.MAGENTA, Color.YELLOW, Color.LIGHTGRAY];
    this.mtbExample.ios.clearButtonColor = colors[random];
  }

  setCharacterRestrictionColor() {
    const random = Math.round(Math.random() * 5);
    const colors = [Color.BLUE, Color.CYAN, Color.GREEN, Color.MAGENTA, Color.YELLOW, Color.LIGHTGRAY];
    this.mtbExample.characterRestrictionColor = colors[random];
  }

  setCharacterRestriction() {
    const count = parseInt(this.tbCharacterRestriction.text) || 5;
    this.mtbExample.characterRestriction = count;
  }

  initMultilineMtb() {
    this.mtbMultiline = new StyleableMaterialTextBox({
      hint: 'Multiline',
      multiline: true,
      android: { maxLines: 2 },
      lineCount: 2
    });

    this.mtbMultiline.ios.expandsOnOverflow = true;
    this.flMultilineMtbWrapper.addChild(this.mtbMultiline, 'mtbMultiline', '.sf-textBox .grow', materialtextboxOptions);
  }

  initNormalMtb() {
    this.mtbExample = new StyleableMaterialTextBox({
      hint: 'Example',
      selectedHintTextColor: Color.BLUE
    });

    this.mtbExample.lineColor = { normal: Color.GRAY, selected: Color.DARKGRAY };

    this.mtbExample.ios.lineHeight = 6;
    this.mtbExample.ios.inlineHintFont = Font.create(Font.DEFAULT, 4, Font.NORMAL);
    this.mtbExample.ios.underlineLabelsFont = Font.create(Font.DEFAULT, 4, Font.NORMAL);

    this.flMtbWrapper.addChild(this.mtbExample, 'mtbExample', '.sf-textBox .grow', materialtextboxOptions);
  }
  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initNormalMtb();
    this.initMultilineMtb();
  }
}
