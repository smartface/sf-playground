import PgMaterialTextBoxDesign from 'generated/pages/pgMaterialTextBox';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Font from '@smartface/native/ui/font';
import Picker from '@smartface/native/ui/picker';
import Label from '@smartface/native/ui/label';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import Flex from '@smartface/native/ui/shared/Flex';
import ImageView from '@smartface/native/ui/imageview';
import Image from '@smartface/native/ui/image';
import Application from '@smartface/native/application';

export default class PgMaterialTextBox extends withDismissAndBackButton(PgMaterialTextBoxDesign) {
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
    const picker = new Picker({
      items: ['Default Right Layout', 'Clear All', 'Show Hide', 'Dropdown']
    });
    picker.show((params) => {
      let view: FlexLayout;
      switch (params.index) {
        // Clear All
        case 1: {
          view = new FlexLayout({
            flexGrow: 1
          });
          const label = new Label({
            text: 'Clear All',
            flexGrow: 1
          });
          view.onTouch = () => {
            this.mtbExample.text = '';
            return false;
          };
          view.addChild(label);
          break;
        }
        case 2: {
          // Show / Hide
          view = new FlexLayout({
            flexGrow: 1,
            alignContent: FlexLayout.AlignContent.FLEX_END
          });
          const label = new Label({
            text: 'Hide',
            textAlignment: TextAlignment.MIDRIGHT,
            flexGrow: 1
          });
          view.onTouch = () => {
            const isPassword = this.mtbExample.isPassword;
            this.mtbExample.isPassword = !isPassword; //Toggle the variable
            label.text = isPassword ? 'Hide' : 'Show';
            return false;
          };
          view.addChild(label);
          break;
        }
        case 3: {
          // Drop down

          view = new FlexLayout({
            flexGrow: 1,
            alignContent: FlexLayout.AlignContent.FLEX_END
          });
          const mtb = this.mtbExample;
          // this.mtbExample.onTouch = () => {
          //   return true;
          // };
          this.mtbExample.onEditBegins = () => {
            alert('dropdown pressed');
            this.mtbExample.removeFocus();
          };
          this.mtbExample.nativeObject.enabled = false;
          const imageview = new ImageView({
            flexGrow: 1,
            tintColor: Color.BLACK,
            alignSelf: FlexLayout.AlignSelf.FLEX_END
          });
          imageview.image = Image.createFromFile('images://arrowbottom.png');
          view.addChild(imageview);
          break;
        }
        default: {
          view = new FlexLayout({
            flexGrow: 1,
            backgroundColor: Color.BLUE
          });
          break;
        }
      }
      this.mtbExample.rightLayout = {
        view,
        width: 60,
        height: 20
      };
    });
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
    this.mtbMultiline.multiline = true;
    this.mtbMultiline.lineCount = 2;
    this.mtbMultiline.on('textChanged', () => {
      console.info('textChanged: ', this.mtbMultiline.text);
    });

    this.mtbMultiline.ios.expandsOnOverflow = true;
  }

  initNormalMtb() {
    this.mtbExample.on('actionButtonPress', () => {
      console.log('mtbExample actionButtonPress');
    });
    this.mtbExample.on('clearButtonPress', () => {
      console.log('mtbExample clearButtonPress');
    });
    this.mtbExample.on('editBegins', () => {
      console.log('mtbExample editBegins');
    });
    this.mtbExample.on('editEnds', () => {
      console.log('mtbExample editEnds');
    });
    this.mtbExample.on('textChanged', (e) => {
      console.log('mtbExample textChanged', e);
    });

    this.mtbExample.lineColor = { normal: Color.GRAY, selected: Color.DARKGRAY };

    this.mtbExample.ios.lineHeight = 6;
    this.mtbExample.ios.inlineHintFont = Font.create(Font.DEFAULT, 4, Font.NORMAL);
    this.mtbExample.ios.underlineLabelsFont = Font.create(Font.DEFAULT, 4, Font.NORMAL);
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
