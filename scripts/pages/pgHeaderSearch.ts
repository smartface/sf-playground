import Page1Design from "generated/pages/pgHeaderSearch";
import SearchView from "@smartface/native/ui/searchview";
import Color from "@smartface/native/ui/color";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgHeaderSearch extends withDismissAndBackButton(Page1Design) {
  mySearchView: SearchView;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnNext.onPress = () => {
      this.router.push("/pages/page2", { message: "Hello World!" });
    };
  }
  initSearchView(): void {
    this.mySearchView = new SearchView();
    this.mySearchView.android.textFieldBorderRadius = 20;
    this.mySearchView.textFieldBackgroundColor = Color.WHITE;
    //@ts-ignore
    this.mySearchView.cursorColor = Color.BLACK;
    this.mySearchView.addToHeaderBar(this);
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initSearchView();
  }
}
