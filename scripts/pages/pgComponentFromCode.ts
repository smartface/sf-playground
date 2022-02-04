import PgComponentFromCodeDesign from "generated/pages/pgComponentFromCode";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Route, BaseRouter as Router } from "@smartface/router";
import type { StyleContextComponentType } from "@smartface/styling-context";
import FlexLayout from "@smartface/native/ui/flexlayout";
import Color from "@smartface/native/ui/color";

export default class PgComponentFromCode extends withDismissAndBackButton(PgComponentFromCodeDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initComponentFromCode() {
    const flexParent: StyleContextComponentType<FlexLayout> = new FlexLayout({ backgroundColor: Color.RED });
    const flexChild: StyleContextComponentType<FlexLayout> = new FlexLayout({ backgroundColor: Color.GREEN });
    this.addChild(flexParent, "flexParent", ".sf-flexLayout");
    // this.addStyleableChild(flexParent, "flexParent", ".sf-flexLayout"); // The parent is page, added from UI so works

    // When the parent component is also added from code like above, this becoemes necessity:
    //@ts-ignore - shouldn't happen but still
    flexParent.addChild(flexChild, "flexChild", ".sf-flexLayout"); //Necessary
    // flexParent.addStyleableChild(flexChild, "flexChild", ".sf-flexLayout"); // The parent is "flexParent", which is added from code so doesn't work. Also necessary

    flexChild.dispatch({
      type: "updateUserStyle",
      userStyle: {
        backgroundColor: "#00FF00",
        flexGrow: 1
      }
    })
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.initComponentFromCode();
  }
}
