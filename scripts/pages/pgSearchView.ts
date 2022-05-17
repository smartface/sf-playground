import PgSearchViewDesign from 'generated/pages/pgSearchView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import Image from '@smartface/native/ui/image';
import Slider from '@smartface/native/ui/slider';
import { SliderEvents } from '@smartface/native/ui/slider/slider-events';
import Font from '@smartface/native/ui/font';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Label from '@smartface/native/ui/label';
import Picker from '@smartface/native/ui/picker';
import { SearchViewStyle } from '@smartface/native/ui/searchview/searchview';
import { SearchViewEvents } from '@smartface/native/ui/searchview/searchview-events';

export default class PgSearchView extends withDismissAndBackButton(PgSearchViewDesign) {
  private _loading = false;
  private _showsCancelButton = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.sv.hint = 'Example Hint';
    this.sv.hintTextColor = Color.CYAN;
    // this.sv.textAlignment = TextAlignment.MIDRIGHT;
    this.sv.textColor = Color.BLACK;
    this.sv.textFieldBackgroundColor = Color.GRAY;
    this.sv.android.textFieldBorderRadius = 16;

    this.btnBackgroundImage.on('press', () => this.setBackgroundImage());
    this.btnCancelButton.on('press', () => this.cancelButtonAndText());
    this.btnCloseIcon.on('press', () => this.setCloseIcon());
    this.btnCursorColor.on('press', () => this.setCursorColor());
    this.btnFont.on('press', () => this.setFont());
    this.btnIconified.on('press', () => this.setIconifiedByDefault());
    this.btnSetLeftItem.on('press', () => this.setLeftItem());
    this.btnLoadingColor.on('press', () => this.setLoadingColor());
    this.btnShowLoading.on('press', () => this.setLoading());
    this.btnSearchButtonIcon.on('press', () => this.setSearchButtonIcon());
    this.btnSearchIcon.on('press', () => this.setSearchIcon());
    this.btnSearchViewStyle.on('press', () => this.setSearchViewStyle());
    this.btnShowCancelButton.on('press', () => this.setShowsCancelButton());

    this.slBorderWidth.on(SliderEvents.ValueChange, (value) => this.changeBorderWidth(value));

    this.sv.on(SearchViewEvents.CancelButtonClicked, () => {
      console.log('CancelButtonClicked');
      this.sv.removeFocus();
    });
    this.sv.on(SearchViewEvents.SearchBegin, () => console.log('SearchBegin'));
    this.sv.on(SearchViewEvents.SearchButtonClicked, () => console.info('SearchButtonClicked'));
    this.sv.on(SearchViewEvents.SearchEnd, () => console.log('SearchEnd'));
    this.sv.on(SearchViewEvents.TextChanged, () => console.log('TextChanged'));
  }

  setShowsCancelButton() {
    this._showsCancelButton = !this._showsCancelButton;
    this.sv.ios.showsCancelButton = this._showsCancelButton;
    this.btnShowCancelButton.text = this._showsCancelButton ? 'Set showsCancelButton False (iOS)' : 'Set showsCancelButton True (iOS)';
  }

  setSearchViewStyle() {
    const picker = new Picker();
    const items = ['DEFAULT', 'MINIMAL', 'PROMINENT'];
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('selected: ', index);
      this.sv.ios.searchViewStyle = SearchViewStyle[items[index]];
    });
    picker.show();
  }

  setSearchIcon() {
    this.sv.searchIcon = Image.createFromFile('images://utility.png');
  }

  setSearchButtonIcon() {
    this.sv.android.searchButtonIcon = Image.createFromFile('images://misc.png');
  }

  setLoading() {
    this._loading = !this._loading;
    if (!this._loading) {
      this.sv.ios.hideLoading();
    } else {
      this.sv.ios.showLoading();
    }
    this.btnShowLoading.text = this._loading ? 'Hide Loading (iOS)' : 'Show Loading (iOS)';
  }

  setLoadingColor() {
    this.sv.ios.loadingColor = Color.BLUE;
  }

  setLeftItem() {
    const customView = new FlexLayout();
    customView.justifyContent = FlexLayout.JustifyContent.CENTER;
    customView.alignItems = FlexLayout.AlignItems.STRETCH;
    customView.alignContent = FlexLayout.AlignContent.STRETCH;
    const label = new Label({ text: '<>', textColor: Color.BLACK, height: 20, width: 20, backgroundColor: Color.RED });
    customView.addChild(label);
    this.sv.android.leftItem = customView;
  }

  setIconifiedByDefault() {
    this.sv.android.iconifiedByDefault = true;
  }

  setFont() {
    this.sv.font = Font.create(Font.DEFAULT, 4);
  }

  changeBorderWidth(value: number) {
    this.sv.borderWidth = value / 100;
    this.lblBorderWidth.text = `BorderWidth Slider (${(value / 100).toString()})`;
  }

  setCursorColor() {
    this.sv.cursorColor = Color.GREEN;
  }

  setCloseIcon() {
    this.sv.android.closeIcon = Image.createFromFile('images://router.png');
  }

  setBackgroundImage() {
    this.sv.ios.backgroundImage = Image.createFromFile('images://sfnative.png');
  }

  cancelButtonAndText() {
    this.sv.ios.cancelButtonColor = Color.YELLOW;
    this.sv.ios.cancelButtonText = 'BYE';
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
