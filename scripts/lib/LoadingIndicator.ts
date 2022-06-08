import Dialog from '@smartface/native/ui/dialog';
import FlWaitingIndicator from 'components/FlWaitingIndicator';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { styleableContainerComponentMixin } from '@smartface/styling-context';
import { DialogStyle } from '@smartface/native/ui/dialog/dialog';

class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

var waitDialog = null;
var activeDialogCounter = 0;

function initWaitDialog(opts?: { closeOnTouch: boolean }) {
  const component = new FlWaitingIndicator();
  let dialog = new Dialog({
    android: {
      themeStyle: DialogStyle.ThemeDefault,
      cancelable: false,
      isTransparent: true
    }
  });
  themeService.addGlobalComponent(dialog.layout, 'genericDialog');
  themeService.addGlobalComponent(component, 'genericWaitingIndicator');
  (dialog.layout as StyleableFlexLayout).dispatch({
    type: 'pushClassNames',
    classNames: '.dialog'
  });
  component.dispatch({
    type: 'pushClassNames',
    classNames: '.flWaitingIndicator'
  });
  if (opts?.closeOnTouch) {
    dialog.layout.onTouchEnded = (isInside) => {
      isInside && dialog.hide();
      return true;
    };
  }
  dialog.layout.addChild(component);
  dialog.layout.applyLayout();
  return dialog;
}

export const showWaitDialog = () => {
  if (!waitDialog) {
    waitDialog = initWaitDialog();
  }
  activeDialogCounter++ === 0 && waitDialog.show();
};

export const hideWaitDialog = (timeout = 0) => {
  if (waitDialog && activeDialogCounter > 0 && --activeDialogCounter === 0) {
    if (timeout) {
      setTimeout(() => waitDialog.hide(), timeout);
    } else {
      waitDialog.hide();
    }
  }
};
