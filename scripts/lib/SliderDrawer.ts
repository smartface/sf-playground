import SliderDrawer from '@smartface/native/ui/sliderdrawer';
import Button from '@smartface/native/ui/button';
import { themeService } from 'theme';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Application from '@smartface/native/application';

class StyleableSliderDrawer extends styleableContainerComponentMixin(SliderDrawer) {}
class StyleableButton extends styleableComponentMixin(Button) {}

let mySliderDrawer = new StyleableSliderDrawer({
  width: 200
});
themeService.addGlobalComponent(mySliderDrawer as any, 'mySliderDrawer');
let myButton = new StyleableButton({
  text: 'Smartface Button'
});

myButton.on('press', () => {
  console.info('sliderDrawer.state: ', Application.sliderDrawer.state);
  Application.sliderDrawer.hide();
});

mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
// mySliderDrawer.drawerPosition = SliderDrawer.Position.RIGHT;
// mySliderDrawer.enabled = false;

mySliderDrawer.addChild(myButton, 'myButton', '.sf-button', {
  height: 40,
  width: 100,
  left: 50,
  top: 50,
  text: 'Smartface Button',
  flexProps: {
    positionType: 'ABSOLUTE'
  }
});

Application.sliderDrawer = mySliderDrawer;
