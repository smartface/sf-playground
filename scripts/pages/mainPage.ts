import MainPageDesign from "generated/pages/mainPage";
import LviPages from "components/LviPages";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import Page from "@smartface/native/ui/page";

export default class MainPage extends withDismissAndBackButton(MainPageDesign) {
  pages: (new (params: any) => Page)[] = [];

  constructor(private router?: Router, private route?: Route, params?: any) {
    super({});
  }

  initListView() {
    this.lvPages.refreshEnabled = false;
    this.lvPages.rowHeight = 54;
    this.lvPages.onRowBind = (listViewItem: LviPages, index) => {
      listViewItem.lblPageName.text = this.pages[index].name;
    };
    this.lvPages.onRowSelected = (listViewItem: LviPages, index) => {
      this.router.push(`${this.pages[index].name}`);
    };
  }

  refreshListView() {
    this.lvPages.itemCount = this.pages.length;
    this.lvPages.refreshData();
  }
  onShow() {
    super.onShow();
    this.refreshListView();
  }
  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
