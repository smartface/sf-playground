import PgTextBoxDesign from 'generated/pages/pgTextBox';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import KeyboardAppearance from '@smartface/native/ui/shared/keyboardappearance';
import TextContentType from '@smartface/native/ui/shared/textcontenttype';
import Font from '@smartface/native/ui/font';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { StatusBarStyle } from '@smartface/native/application/statusbar/statusbar';
import Application from '@smartface/native/application';
import ActionKeyType from '@smartface/native/ui/shared/android/actionkeytype';
import { TextBoxEvents } from '@smartface/native/ui/textbox/textbox-events';
import Picker from '@smartface/native/ui/picker';
import AutoCapitalize from '@smartface/native/ui/shared/autocapitalize';

export default class PgTextBox extends withDismissAndBackButton(PgTextBoxDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnTextAlignment.on('press', () => this.showPickerForTextAlignment());
    this.btnChangeKeyboardType.on('press', () => this.showPickerKeyboardType());
  }

  showPickerForTextAlignment() {
    const picker = new Picker();
    const items = ['TOPLEFT', 'TOPCENTER', 'TOPRIGHT', 'MIDLEFT', 'MIDCENTER', 'MIDRIGHT', 'BOTTOMLEFT', 'BOTTOMCENTER', 'BOTTOMRIGHT'];
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('selected: ', index);
      this.tvMain.textAlignment = TextAlignment[items[index]];
    });
    picker.show();
  }

  initTextView() {
    this.tvMain.backgroundColor = Color.GRAY;
    this.tvMain.font = Font.create('Arial', 20, Font.BOLD);
    this.tvMain.maxLines = 0;
    this.tvMain.selectable = true;
    this.tvMain.text = 'A new text for the texview component to be shown on the multiline';
    this.tvMain.textAlignment = TextAlignment.TOPCENTER;
    this.tvMain.textColor = Color.WHITE;
    if (System.OS === System.OSType.IOS) {
      this.tvMain.ios.showScrollBar = true;
    }
    this.tvMain.scrollEnabled = true;
    this.tvMain.letterSpacing = 1;
  }

  initTextBoxEvents() {
    this.tbName.on('actionButtonPress', () => {
      console.log('TextBox actionButtonPress test');
      this.tbMail.requestFocus();
    });
    this.tbName.on('clearButtonPress', () => {
      console.log('TextBox clearButtonPress test');
    });
    this.tbMail.on('editBegins', () => {
      console.log('TextBox editBegins test');
    });
    this.tbMail.on('editEnds', () => {
      console.log('TextBox editEnds test');
    });
    this.tbPin.on('textChanged', () => {
      console.log('TextBox textChanged test');
    });
  }

  initActionKeyTypeButtons() {
    this.btnActionKeyTypeDefault.on('press', () => this.changeActionKeyType(ActionKeyType.DEFAULT));
    this.btnActionKeyTypeGo.on('press', () => this.changeActionKeyType(ActionKeyType.GO));
    this.btnActionKeyTypeNext.on('press', () => this.changeActionKeyType(ActionKeyType.NEXT));
    this.btnActionKeyTypeSearch.on('press', () => this.changeActionKeyType(ActionKeyType.SEARCH));
    this.btnActionKeyTypeSend.on('press', () => this.changeActionKeyType(ActionKeyType.SEND));
  }

  changeActionKeyType(type: ActionKeyType) {
    this.tbPin.actionKeyType = type;
    this.tbPin.on('actionButtonPress', () => console.log('action button pressed'));
  }

  showPickerKeyboardType() {
    const picker = new Picker();
    const items = ['DECIMAL', 'DEFAULT', 'EMAILADDRESS', 'NUMBER', 'PHONE', 'URL'];
    picker.items = items;
    picker.on('selected', (index) => {
      console.log('Keyboard Type Selected: ', items[index]);
      this.tbDynamic.keyboardType = KeyboardType[items[index]];
    });
    picker.show();
  }

  initTextBoxes() {
    const userNameType = System.OS === System.OSType.ANDROID ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;

    this.tbName.keyboardType = userNameType;
    this.tbName.text = 'Name';
    this.tbName.autoCapitalize = 1;
    this.tbName.cursorColor = Color.GREEN;

    this.tbName.autoCapitalize = AutoCapitalize.WORDS; // THIS TO BE TESTED AS WELL.

    if (System.OS === System.OSType.IOS) {
      this.tbName.ios.clearButtonEnabled = true;
      this.tbName.ios.minimumFontSize = 20;
      this.tbName.ios.keyboardAppearance = KeyboardAppearance.DARK;
      this.tbPin.ios.textContentType = TextContentType.ONETIMECODE;
    }
    if (System.OS === System.OSType.ANDROID) {
      //  this.tbPin.android.maxLength = 4;
    }

    this.tbMail.keyboardType = KeyboardType.EMAILADDRESS;
    this.tbMail.text = 'Email Address';

    this.tbPin.keyboardType = KeyboardType.NUMBER;
    this.tbPin.text = '';

    this.tbDynamic.hint = 'Change keyboard types from button below';

    // const keyboardLayouts = KeyboardLayout.init([
    //     this.tbName,
    //     this.tbMail,
    //     this.tbPin
    // ]);
    this.initTextBoxEvents();
  }

  initFontTest() {
    if (System.OS === System.OSType.IOS) {
      const fontNames = Font.ios.allFontNames();
      for (const font in fontNames) {
        console.log('iOS allFontNamesTest: ', fontNames[font]);
      }
    }
    const newFont = Font.createFromFile('assets://FontAwesome5BrandsRegular.ttf', 30);
    console.log('Size of the font that got created from a file ', newFont.size);
    const { paddingLeft: pagePadding } = themeService.getNativeStyle('.sf-page');
    console.log('SizeOfString test: ', this.tvMain.font.sizeOfString(this.tvMain.text, Screen.width - pagePadding * 2));
  }

  initBadge() {
    const headerBarItem = new HeaderBarItem();
    headerBarItem.title = 'Badge';
    headerBarItem.badge.text = '5';
    headerBarItem.badge.visible = true;
    headerBarItem.badge.move(0, 0);
    this.headerBar.setItems([headerBarItem]);
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
    this.initTextBoxes();
    this.initTextView();
    this.initFontTest();
    this.initBadge();
    this.initActionKeyTypeButtons();
  }
}
