import PgComponentFromCodeDesign from 'generated/pages/pgComponentFromCode';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin } from '@smartface/styling-context';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Color from '@smartface/native/ui/color';

class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

export default class PgComponentFromCode extends withDismissAndBackButton(PgComponentFromCodeDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initComponentFromCode() {
    const flexParent = new StyleableFlexLayout({ backgroundColor: Color.RED });
    const flexChild = new StyleableFlexLayout({ backgroundColor: Color.GREEN });
    this.addChild(flexParent, 'flexParent', '.sf-flexLayout');

    flexParent.addChild(flexChild, 'flexChild', '.sf-flexLayout'); //Necessary

    flexChild.style.apply({ backgroundColor: '#00FF00', flexGrow: 1 });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.initComponentFromCode();
  }

  onLoad() {
    super.onLoad();
  }
}
