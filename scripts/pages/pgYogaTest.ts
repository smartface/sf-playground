import PgYogaTestDesign from 'generated/pages/pgYogaTest';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Screen from '@smartface/native/device/screen';
import System from '@smartface/native/device/system';
import View from '@smartface/native/ui/view';
import { themeService } from 'theme';
import { Router, Route } from '@smartface/router';
import { styleableContainerComponentMixin } from '@smartface/styling-context';

class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

const { paddingLeft, paddingRight, paddingTop, paddingBottom } = themeService.getStyle('.sf-page');

const MAX_WIDTH = Screen.width - (paddingLeft + paddingRight);
const MIN_WIDTH = MAX_WIDTH / 2;
const MAX_HEIGHT = (Screen.height - (paddingTop + paddingBottom)) / 4;
const MIN_HEIGHT = MAX_HEIGHT / 2;
const MAX_ITEM_LENGTH = 150;
const MAX_DURATION = 5_000;
const MIN_DURATION = 1_000;

export default class PgYogaTest extends PgYogaTestDesign {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initLayout() {
    for (let i = 0; i < MAX_ITEM_LENGTH; i++) {
      const parentFlex = new StyleableFlexLayout();
      this.svMain.addChild(parentFlex, `parent${i}`, '.sf-flexLayout #pgYogaTest-parent');
      parentFlex.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          width: this.getRandomWidth(),
          height: this.getRandomHeight()
        }
      });

      const childFlex = new StyleableFlexLayout();
      parentFlex.addChild(childFlex, `child${i}`, '.sf-flexLayout #pgYogaTest-child');
      childFlex.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          width: this.getRandomWidth(),
          height: this.getRandomHeight()
        }
      });

      setInterval(() => {
        parentFlex.dispatch({
          type: 'updateUserStyle',
          userStyle: {
            width: this.getRandomWidth(),
            height: this.getRandomHeight()
          }
        });
        childFlex.dispatch({
          type: 'updateUserStyle',
          userStyle: {
            width: this.getRandomWidth() / 2,
            height: this.getRandomHeight() / 2
          }
        });
      }, this.getRandomDuration());
    }
  }
  getRandomWidth = () => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH);
  getRandomHeight = () => Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT);
  getRandomDuration = () => Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1) + MIN_DURATION);

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.initLayout();
  }
}
