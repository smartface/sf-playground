import PgViewDesign from 'generated/pages/pgView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Picker from '@smartface/native/ui/picker';
import System from '@smartface/native/device/system';
import { FlexLayoutEvents } from '@smartface/native/ui/flexlayout/flexlayout-events';
import { ViewEvents } from '@smartface/native/ui/view/view-events';
import View from '@smartface/native/ui/view';
import Color from '@smartface/native/ui/color';

export default class PgView extends withDismissAndBackButton(PgViewDesign) {
  private _boxesVisible = true;
  private _z2InFront = true;
  private _vEventLock = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  setMinAndMaxWidth() {
    const min = parseInt(this.tbMinWidth.text) || 0;
    const max = parseInt(this.tbMaxWidth.text) || 100;
    this.v4.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        minWidth: min,
        maxWidth: max
      }
    });
    this.v4.applyLayout();
  }

  initProps() {
    this.v1.ios.exclusiveTouch = true;
    this.v2.flexBasis = System.OS === System.OSType.IOS ? 60 : 140;
    this.v2.maskedBorders = [View.Border.BOTTOM_LEFT];
    this.vRipple.android.rippleEnabled = true;
    this.vRipple.android.rippleColor = Color.BLUE;
    this.v3.rotation = 10;
    this.v5.rotationX = 50;
    this.v6.rotationY = 50;
    this.v7.scale = { x: 0.5, y: 0.75 };
    this.v4.ios.masksToBounds = false;
    this.v4.ios.shadowColor = Color.BLACK;
    this.v4.ios.shadowOffset = { x: 2, y: 2 };
    this.v4.ios.shadowOpacity = 0.75;
    this.v4.ios.shadowRadius = 4;
  }

  viewEvents() {
    this.vEvents.on('touch', () => console.info('View1 Touch'));
    this.vEvents.on('touchCancelled', () => console.info('View1 TouchCancelled'));
    this.vEvents.on('touchEnded', () => console.info('View1 TouchEnded'));
    this.vEvents.on('touchMoved', () => {
      if (!this._vEventLock) {
        console.info('View1 TouchMoved');
        this._vEventLock = true;
        setTimeout(() => (this._vEventLock = false), 1000);
      }
    });
  }

  initEvents() {
    this.btnAlignSelf.on('press', () => this.showPickerForAlignSelf());
    this.btnAspectRatio.on('press', () => this.setAspectRatio());
    this.slAlpha.on('valueChange', (value) => this.updateAlpha(value));
    this.slElevation.on('valueChange', (value) => this.updateElevation(value));
    this.flWrapper.on('touch', () => console.info('FlexLayout Touch'));
    this.v1.on('touch', () => console.info('v1 Touch'));
    this.btnSetMinMaxWidth.on('press', () => this.setMinAndMaxWidth());
    this.btnTouchEnabled.on('press', () => this.disableTouch());
    this.btnVisibility.on('press', () => this.changeVisibility());
    this.btnZIndex.on('press', () => this.changeZIndex());
    this.btnBringToFront.on('press', () => this.bringPurpleToFront());
    this.btnFlipVertical.on('press', () => this.flipVertical());
    this.btnFlipHorizontal.on('press', () => this.flipHorizontal());
    this.viewEvents();
  }

  flipVertical() {
    this.vFlipVertical.flipVertically();
  }

  flipHorizontal() {
    this.vFlipHorizontal.flipHorizontally();
  }

  bringPurpleToFront() {
    this.vz1.bringToFront();
  }

  changeZIndex() {
    this.vz1.android.zIndex = this._z2InFront ? 0 : -1;
    this.vz2.android.zIndex = this._z2InFront ? -1 : 0;
    this._z2InFront = !this._z2InFront;
  }

  changeVisibility() {
    const visible = this._boxesVisible;
    this._boxesVisible = !this._boxesVisible;
    [this.v1, this.v2, this.v3].forEach((v) => {
      v.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          visible: !visible
        }
      });
    });
  }
  disableTouch() {
    this.v1.touchEnabled = false;
  }

  updateElevation(value: number) {
    [this.v1, this.v2, this.v3].forEach((v) => {
      v.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          android: {
            elevation: value
          }
        }
      });
    });
  }

  applyFlLayout() {
    System.OS === System.OSType.IOS ? this.sv.layout.applyLayout() : this.flWrapper.applyLayout();
  }

  setAspectRatio() {
    [this.v1, this.v2, this.v3].forEach((v) => {
      v.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          aspectRatio: 1
        }
      });
    });
    this.applyFlLayout();
  }

  updateAlpha(alpha: number) {
    [this.v1, this.v2, this.v3].forEach((v) => {
      v.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          alpha: alpha / 100
        }
      });
    });
  }

  showPickerForAlignSelf() {
    const picker = new Picker();
    const items = ['AUTO', 'CENTER', 'FLEX_START', 'FLEX_END', 'STRETCH'];
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('selected: ', index);
      [this.v1, this.v2, this.v3].forEach((v) => {
        v.dispatch({
          type: 'updateUserStyle',
          userStyle: {
            flexProps: {
              alignSelf: items[index]
            }
          }
        });
      });
      this.applyFlLayout();
    });
    picker.show();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initEvents();
    this.initProps();
  }
}
