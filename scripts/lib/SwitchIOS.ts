import System from '@smartface/native/device/system';
import View from '@smartface/native/ui/view';

export default class SwitchIOS extends View {
  constructor(params?: any) {
    super();
    if (System.OS === System.OSType.IOS) {
      const NativeSwitch = requireClass('UISwitch');
      const SwitchController = defineClass('SwitchController : NSObject', {
        switchAction: function () {
          if (typeof this.onToggle === 'function') {
            this.onToggle.call(this, this);
          }
        }.bind(this)
      });
      const controllerInstance = SwitchController.new();
      this.nativeObject = NativeSwitch.new();
      this.nativeObject.addTargetActionForControlEvents(controllerInstance, 'switchAction', 1 << 12);
    }
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get toggle(): boolean {
    return this.nativeObject.isOn;
  }
  set toggle(toggle: boolean) {
    this.nativeObject.setOnAnimated(toggle, true);
  }
}
