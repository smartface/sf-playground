import PgRangeSliderDesign from 'generated/pages/pgRangeSlider';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context'; 
import RangeSlider from "@smartface/native/ui/rangeslider";
import Color from "@smartface/native/ui/color";
import Image from "@smartface/native/ui/image";

class StyleableRangeSlider extends styleableComponentMixin(RangeSlider) {}

export default class PgRangeSlider extends withDismissAndBackButton(PgRangeSliderDesign) {
  myRangeSlider: RangeSlider;
  constructor(private router?: Router, private route?: Route) {
    super({});
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
    this.myRangeSlider = new StyleableRangeSlider({
        trackColor: Color.create("#00A1F1"),
        outerTrackColor: Color.create("#eaedf2"),
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
          outerTrackWeight: 15,
        },
        ios: {
          isHapticSnap: true,
          showsThumbImageShadow: true,
          thumbImage: Image.createFromFile("images://slider_icon.png"),
        }
      });

      this.myRangeSlider.on('valueChange', (value) => {
          console.log('Value : ' + value);
      })
    
      this.addChild(this.myRangeSlider, "myRangeSlider", null, {
        width: 350,
        height: 200,
      });
  }
}
