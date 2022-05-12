import MainPageDesign from 'generated/pages/mainPage';
import LviPages from 'components/LviPages';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Page from '@smartface/native/ui/page';
import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Application from '@smartface/native/application';

export default class MainPage extends withDismissAndBackButton(MainPageDesign) {
  _pages: ConstructorOf<Page>[] = [];
  constructor(private router?: Router, private route?: Route, params?: any) {
    super({});
    this.lblDisclaimer.on('touchEnded', () => {
      //   console.info('sliderDrawer.state: ', Application.sliderDrawer.state);
      //   Application.sliderDrawer.show();
    });
  }

  initListView() {
    this.lvPages.refreshEnabled = false;
    this.lvPages.rowHeight = 54;
    this.lvPages.onRowBind = (listViewItem: LviPages, index) => {
      const name = this.pages[index].name;
      const textWithoutPrefix = name.substring(0, 2) === 'Pg' ? name.slice(2) : name;
      listViewItem.lblPageName.text = textWithoutPrefix;
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
  }
  onLoad() {
    super.onLoad();
    this.headerBar.leftItemEnabled = false;
    this.initListView();
  }

  set pages(value) {
    this._pages = value.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });
    this.refreshListView();
  }

  get pages() {
    return this._pages;
  }
}
