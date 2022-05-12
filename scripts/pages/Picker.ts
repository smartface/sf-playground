import PgPickerDesign from 'generated/pages/Picker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Button from '@smartface/native/ui/button';
import Picker from '@smartface/native/ui/picker';
import Screen from '@smartface/native/device/screen';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';

class StyleableButton extends styleableComponentMixin(Button) {}
class StyleableLabel extends styleableComponentMixin(Label) {}

export default class PgPicker extends withDismissAndBackButton(PgPickerDesign) {
  items: string[] = [
    //Text values of the picker
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5'
  ];
  index: number = 0;
  lblSelection: StyleableLabel;
  btnPick: StyleableButton;
  itemPicker: Picker;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  btnPickOnPress(): void {
    console.log(`Showing the picker with index ${++this.index}`);
    //@ts-ignore
    this.itemPicker.show(this.okCallback.bind(this), this.cancelCallback.bind(this));
  }

  okCallback(params: { index: number }) {
    console.log('ok clicked');
    this.index = params.index;
    this.lblSelection.text = this.items[params.index];

    return params;
  }

  cancelCallback(): void {
    console.log('cancel clicked');
  }

  initNativeTypescriptTest() {
    if (System.OS === System.OSType.ANDROID) {
      // this.itemPicker.android.enabled = false; // this to be tested with false as well.
    } else {
      this.itemPicker.ios.cancelHighlightedColor = Color.RED;
      this.itemPicker.ios.okHighlightedColor = Color.BLUE;
      this.itemPicker.ios.dialogLineColor = Color.GREEN;
    }
    this.itemPicker.textColor = Color.GRAY;
    this.itemPicker.dialogBackgroundColor = Color.BLACK;
    this.itemPicker.title = 'PICK';
    this.itemPicker.titleColor = Color.MAGENTA;
    this.itemPicker.titleFont = Font.create('Arial', 20, Font.BOLD);
    this.itemPicker.cancelColor = Color.MAGENTA;
    this.itemPicker.cancelText = 'NO';
    this.itemPicker.cancelFont = Font.create('Arial', 13, Font.ITALIC);
    this.itemPicker.okColor = Color.CYAN;
    this.itemPicker.okText = 'YES';
    this.itemPicker.okFont = Font.create('Arial', 13, Font.ITALIC);
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();

    this.itemPicker = new Picker({
      items: this.items,
      currentIndex: this.index //restores previous selection
    });
    this.itemPicker.on('selected', () => {
      console.log('Picker onselected event test');
    });
    this.initNativeTypescriptTest();
    this.lblSelection = new StyleableLabel({
      text: ''
    });
    this.addChild(this.lblSelection, 'lblSelection', '.sf-label', {
      marginTop: 100,
      height: 30,
      width: 100,
      marginBottom: null
    });

    this.btnPick = new StyleableButton({
      text: 'Pick item',
      onPress: this.btnPickOnPress.bind(this)
    });

    this.addChild(this.btnPick, 'btnPick', '.sf-button', {
      marginTop: 30,
      width: Screen.width / 2,
      height: 70
    });
  }
}
