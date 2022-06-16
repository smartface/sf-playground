import Page1Design from 'generated/pages/page1';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

// import View from "@smartface/native/ui/view";
// import { styleableComponentMixin } from '@smartface/styling-context'; 
// class StyleableView extends styleableComponentMixin(View) {}

export default class PgTest extends withDismissAndBackButton(Page1Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();

    // const myView = new StyleableView();

    // this.addChild(myView, "myView", ".sf-view", {
    //     width: 250,
    //     flexGrow: 1,
    //     height: 200,
    //     backgroundColor: "#00A1F1",
    //     flexProps: {
    //       alignSelf: "CENTER",
    //     },
    //   });
  }
}
