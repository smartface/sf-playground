import PgSelectablePickerDesign from 'generated/pages/pgSelectablePicker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import SelectablePicker from '@smartface/native/ui/selectablepicker';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';

export default class PgSelectablePicker extends withDismissAndBackButton(PgSelectablePickerDesign) {
  private _picker: SelectablePicker;
  private _cancelable = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initEvents() {
    this.swCancelable.on('toggleChanged', (value) => {
      this._cancelable = value;
      this.initPicker();
    });
    this.btnShowPicker.on('press', () => {
      this._picker.show(
        (param: { items: number | number[] }) => {
          console.log('done', param);
        },
        () => console.log('cancelled')
      );
    });
  }

  initPicker() {
    this._picker = new SelectablePicker({
      items: ['Hello', 'World', 'Smartface'],
      cancelable: this._cancelable,
      backgroundColor: Color.WHITE,
      cancelButtonColor: Color.RED,
      cancelButtonFont: Font.create(Font.DEFAULT, 16, Font.BOLD),
      cancelButtonText: '-Cancel-',
      doneButtonColor: Color.GREEN,
      doneButtonFont: Font.create(Font.DEFAULT, 16, Font.BOLD),
      doneButtonText: '-Done-',
      title: 'SelectablePickerTitle',
      titleColor: Color.LIGHTGRAY,
      titleFont: Font.create(Font.DEFAULT, 24, Font.BOLD)
    });
    this._picker.off('selected', () => {});
    this._picker.on('selected', (index, selected) => console.log('selected', { index, selected }));
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    if (System.OS === System.OSType.ANDROID) {
      this.initPicker();
      this.initEvents();
    }
  }
}
