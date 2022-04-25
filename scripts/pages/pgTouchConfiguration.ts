import PgTouchConfigurationDesign from 'generated/pages/pgTouchConfiguration';
// import { addPressEvent } from '@smartface/native/ui/view/touchconfiguration'
import Color from '@smartface/native/ui/color';
const DEFAULT_COLOR = Color.create(23, 200, 23);
export default class PgTouchConfiguration extends PgTouchConfigurationDesign {
  options = {
    rippleColor: DEFAULT_COLOR,
    fadeColor: DEFAULT_COLOR,
    fadeDuration: 200,
    fadeMaxOpacity: 1
  };
  constructor() {
    super();
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.tbFadeDuration.text = this.options.fadeDuration.toString();
    this.tbFadeMaxOpacity.text = this.options.fadeMaxOpacity.toString();
    this.btnUpdate.onTouch = () => {
      this.updateConfiguration();
      return true;
    };
  }
  updateConfiguration() {
    this.options = {
      rippleColor: DEFAULT_COLOR,
      fadeColor: DEFAULT_COLOR,
      fadeDuration: parseInt(this.tbFadeDuration.text) >= 0 ? parseInt(this.tbFadeDuration.text) : 200,
      fadeMaxOpacity: parseFloat(this.tbFadeMaxOpacity.text) >= 0 ? parseFloat(this.tbFadeMaxOpacity.text) : 1
    };
    this.initTouchConfiguration();
  }
  initTouchConfiguration() {
    // addPressEvent(this.flex, () => alert('Pressed'), this.options);
  }
}

function onShow(this: PgTouchConfiguration, superOnShow: () => void) {
  superOnShow();
  this.initTouchConfiguration();
}

function onLoad(this: PgTouchConfiguration, superOnLoad: () => void) {
  superOnLoad();
}
