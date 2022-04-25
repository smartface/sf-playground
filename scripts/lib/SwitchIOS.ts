import System from '@smartface/native/device/system';
import View from '@smartface/native/ui/view';

export default class SwitchIOS extends View {
  constructor(params?: any) {
    super();
    if (System.OS === 'iOS') {
      //@ts-ignore
      const NativeSwitch = SF.requireClass('UISwitch');
      //@ts-ignore
      const SwitchController = SF.defineClass('SwitchController : NSObject', {
        switchAction: function () {
          if (typeof this.onToggle === 'function') {
            this.onToggle.call(this, this);
          }
        }.bind(this)
      });
      const controllerInstance = SwitchController.new();
      //@ts-ignore
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
