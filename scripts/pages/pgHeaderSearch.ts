import Page1Design from "generated/pages/pgHeaderSearch";
import SearchView from "@smartface/native/ui/searchview";
import Color from "@smartface/native/ui/color";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import Button from "@smartface/native/ui/button";
import System from "@smartface/native/device/system";
import Image from "@smartface/native/ui/image";
import KeyboardAppearance from "@smartface/native/ui/keyboardappearance";

export default class PgHeaderSearch extends withDismissAndBackButton(Page1Design) {
  mySearchView: SearchView;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnNext.on(Button.Events.Press, () => {
      this.router.push("/pages/page2", { message: "Hello World!" });
    });
  }

  initSearchViewEvents() {
    this.mySearchView.on("cancelButtonClicked", () => {
        console.log('SearchView cancelButtonClicked test');
    });
    this.mySearchView.on("searchBegin", () => {
        console.log('SearchView searchBegin test');
    });
    this.mySearchView.on("searchButtonClicked", () => {
        console.log('SearchView searchButtonClicked test');
    });
    this.mySearchView.on("searchEnd", () => {
        console.log('SearchView searchEnd test');
    });
    this.mySearchView.on("textChanged", () => {
        console.log('SearchView textChanged test');
    });
  }

  initSearchView(): void {
    this.mySearchView = new SearchView();
    this.mySearchView.textFieldBackgroundColor = Color.WHITE;
    this.mySearchView.searchIcon = Image.createFromFile('images://headerbar_done.png');
    this.mySearchView.text = "Default Text";
    this.initSearchViewEvents();
    //@ts-ignore
    this.mySearchView.cursorColor = Color.BLACK;
    if(System.OS === System.OSType.ANDROID) {
        this.mySearchView.android.searchButtonIcon = Image.createFromFile('images://headerbar_done.png');
        this.mySearchView.android.iconifiedByDefault = true;
        this.mySearchView.android.closeIcon = Image.createFromFile('images://close_icon.png');
        this.mySearchView.android.textFieldBorderRadius = 20;
    }
    else {
        this.mySearchView.ios.searchViewStyle = SearchView.iOS.Style.MINIMAL;
        this.mySearchView.ios.showsCancelButton = true;
        this.mySearchView.ios.cancelButtonColor = Color.RED;
        this.mySearchView.ios.cancelButtonText = 'Cancel';
        this.mySearchView.ios.keyboardAppearance = KeyboardAppearance.DARK;

    }
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
