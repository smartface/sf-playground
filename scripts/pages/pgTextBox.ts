import PgTextBoxDesign from 'generated/pages/pgTextBox';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import KeyboardType from "@smartface/native/ui/keyboardtype";
import KeyboardLayout from "@smartface/component-keyboardlayout";
import System from '@smartface/native/device/system';
import TextBox, { AutoCapitalize } from '@smartface/native/ui/textbox';
import Color from '@smartface/native/ui/color';
import KeyboardAppearance from '@smartface/native/ui/keyboardappearance';
import TextContentType from '@smartface/native/ui/textcontenttype';
export default class PgTextBox extends withDismissAndBackButton(PgTextBoxDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initTextBoxEvents() {
      this.tbName.on("actionButtonPress", () => {
          console.log("TextBox actionButtonPress test");
          this.tbMail.requestFocus();
      });
      this.tbName.on("clearButtonPress", () => {
        console.log("TextBox clearButtonPress test");
      });
      this.tbMail.on("editBegins", () => {
        console.log("TextBox editBegins test");
      });
      this.tbMail.on("editEnds", () => {
        console.log("TextBox editEnds test");
      });
      this.tbPin.on("textChanged", () => {
        console.log("TextBox textChanged test");
      });
      
  }

  initTextBoxes() {
    const userNameType =
    System.OS === System.OSType.ANDROID
      ? KeyboardType.Android.TEXTPERSONNAME
      : KeyboardType.DEFAULT;

    this.tbName.keyboardType = userNameType;
    this.tbName.text = "Name";
    this.tbName.autoCapitalize = 1;
    this.tbName.cursorColor = Color.GREEN;

//  this.tbName.autoCapitalize = AutoCapitalize.WORDS;  // THIS TO BE TESTED AS WELL.

    if(System.OS === System.OSType.IOS) {
        this.tbName.ios.clearButtonEnabled = true;
        this.tbName.ios.minimumFontSize = 20;
        this.tbName.ios.keyboardAppearance = KeyboardAppearance.DARK;
        this.tbPin.ios.textContentType = TextContentType.ONETIMECODE;
    }
    if(System.OS === System.OSType.ANDROID) {
        this.tbPin.android.maxLength = 4;
    }
    
    this.tbMail.keyboardType = KeyboardType.EMAILADDRESS;
    this.tbMail.text = "Email Address";

    this.tbPin.keyboardType = KeyboardType.NUMBER;
    this.tbPin.text = "";

    const keyboardLayouts = KeyboardLayout.init([
        this.tbName,
        this.tbMail,
        this.tbPin
    ]);
    this.initTextBoxEvents();
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
  }
}
