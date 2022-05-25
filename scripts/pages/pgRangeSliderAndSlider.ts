import PgRangeSliderAndSliderDesign from 'generated/pages/pgRangeSliderAndSlider';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import RangeSlider from '@smartface/native/ui/rangeslider';
import Color from '@smartface/native/ui/color';
import Image from '@smartface/native/ui/image';

class StyleableRangeSlider extends styleableComponentMixin(RangeSlider) {}

export default class PgRangeSliderAndSlider extends withDismissAndBackButton(PgRangeSliderAndSliderDesign) {
  myRangeSlider: RangeSlider;
  _lock = false;
  _isColor = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnSetMinMax.on('press', () => this.setMinMax());
    this.btnSetThumb.on('press', () => this.setThumb());
    this.btnSetRandomValue.on('press', () => this.setRandomValue());
    this.sl.on('valueChange', (value) => console.log('Slider value changed: ', value));
    this.swEnabled.on('toggleChanged', (toggle) => (this.sl.enabled = toggle));
  }

  setRandomValue() {
    const min = this.sl.minValue;
    const max = this.sl.maxValue;
    const random = Math.max(min, Math.round(Math.random() * (max - 1)));
    this.sl.value = random;
  }

  setThumb() {
    if (this._isColor) {
      this.sl.thumbImage = Image.createFromFile('images://smartface.png');
    } else {
      this.sl.thumbColor = Color.DARKGRAY;
    }
    this._isColor = !this._isColor;
  }

  setMinMax() {
    const min = parseInt(this.tbMin.text) || 0;
    const max = parseInt(this.tbMax.text) || 100;
    this.sl.minValue = min;
    this.sl.maxValue = max;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.sl.maxTrackColor = Color.RED;
    this.sl.minTrackColor = Color.GREEN;
    this.sl.thumbColor = Color.DARKGRAY;
    this.myRangeSlider = new StyleableRangeSlider({
      trackColor: Color.create('#00A1F1'),
      outerTrackColor: Color.create('#eaedf2'),
      minValue: 0,
      maxValue: 200,
      trackWeight: 20,
      snapStepSize: 5,
      rangeEnabled: true,
      isTrackRounded: true,
      android: {
        thumbColor: Color.BLUE,
        thumbBorderColor: Color.GREEN,
        thumbBorderWidth: 1,
        thumbSize: 15,
        outerTrackWeight: 15
      },
      ios: {
        isHapticSnap: true,
        showsThumbImageShadow: true,
        thumbImage: Image.createFromFile('images://slider_icon.png')
      }
    });

    this.myRangeSlider.on('valueChange', (value) => {
      if (!this._lock) {
        console.log('Value : ' + value);
        this._lock = true;
        setTimeout(() => (this._lock = false), 1000);
      }
    });

    this.flRangeSlider.addChild(this.myRangeSlider, 'myRangeSlider', '.grow');
  }
}
