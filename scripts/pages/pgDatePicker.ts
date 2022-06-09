import PgDatePickerDesign from 'generated/pages/pgDatePicker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import DatePicker from '@smartface/native/ui/datepicker';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import { DatePickerMode, DatePickerStyle } from '@smartface/native/ui/datepicker/datepicker';

export default class PgDatePicker extends withDismissAndBackButton(PgDatePickerDesign) {
  datePicker: DatePicker;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShowPicker.on('press', () => this.datePicker.show());
  }

  initDatePicker() {
    this.datePicker = new DatePicker({
      android: {
        style: DatePickerStyle.MATERIAL_DARK
      }
    });
    if (System.OS === System.OSType.IOS) {
      this.datePicker.ios.title = 'Datepicker Title';
      this.datePicker.ios.titleColor = Color.WHITE;
      this.datePicker.ios.titleFont = Font.create('Arial', 20, Font.BOLD);
      this.datePicker.ios.cancelText = 'Cancel Action';
      this.datePicker.ios.cancelColor = Color.RED;
      this.datePicker.ios.cancelHighlightedColor = Color.MAGENTA;
      this.datePicker.ios.cancelFont = Font.create('Arial', 14, Font.ITALIC);
      this.datePicker.ios.okText = 'OK Action';
      this.datePicker.ios.okColor = Color.BLUE;
      this.datePicker.ios.okHighlightedColor = Color.CYAN;
      this.datePicker.ios.okFont = Font.create('Arial', 14, Font.ITALIC);
      this.datePicker.ios.datePickerMode = DatePickerMode.DATEANDTIME;
      this.datePicker.ios.dialogBackgroundColor = Color.WHITE;
      this.datePicker.ios.dialogLineColor = Color.BLACK;
    }
    this.datePicker.setDate(new Date());
    this.datePicker.setMinDate(new Date(2015, 10, 10));
    this.datePicker.setMaxDate(new Date(2024, 10, 10));
    this.datePicker.on('cancelled', () => {
      console.log('Datepicker onCancelled test');
    });
    this.datePicker.on('selected', (selected) => {
      console.log('Datepicker onSelected test: ', selected);
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initDatePicker();
  }

  onLoad() {
    super.onLoad();
  }
}
