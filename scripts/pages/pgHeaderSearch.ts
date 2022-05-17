import Page1Design from 'generated/pages/pgHeaderSearch';
import SearchView from '@smartface/native/ui/searchview';
import Color from '@smartface/native/ui/color';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Screen from '@smartface/native/device/screen';
import faker from '@faker-js/faker';
import LviDynamicLine from 'components/LviDynamicLine';
import Image from '@smartface/native/ui/image';
import Application from '@smartface/native/application';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

const isAndroid = System.OS === System.OSType.ANDROID;

export default class PgHeaderSearch extends withDismissAndBackButton(Page1Design) {
  mySearchView: SearchView;
  myHeaderBarItem: HeaderBarItem;
  private _data: string[] = [];
  private _original: string[] = [];
  private _searchActive = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  refreshListView() {
    this.lv.itemCount = this._data.length;
    this.lv.refreshData();
  }

  initListView() {
    this.lv.refreshEnabled = false;
    this.lv.onRowHeight = (index) => LviDynamicLine.getHeight(this._data[index]);
    this.lv.onRowBind = (listViewItem: LviDynamicLine, index) => {
      listViewItem.text = this._data[index];
      listViewItem.separatorVisible = this._data.length - 1 !== index;
    };
  }

  generateRandomData() {
    this._original = new Array(50).fill(0).map(() => {
      return faker.lorem.word();
    });
    this._data = this._original;
  }

  setHeaderSearch(visible: boolean) {
    if (visible) {
      //Same child can't be added to different parents, so if its added somewhere we have to remove it first.
      this.mySearchView?.getParent()?.removeChild?.(this.mySearchView);
      this.initSearchView();
      const titleLayout = new FlexLayout({ flexGrow: 1 });
      if (!isAndroid) {
        titleLayout.height = this.getHeaderBar().height;
        titleLayout.width = Screen.width - 110;
      }
      titleLayout.addChild(this.mySearchView);
      this.headerBar.titleLayout = titleLayout;
    } else {
      this.headerBar.titleLayout = undefined;
    }
    this.headerBar.title = visible ? '' : 'HeaderSearch';
  }

  getHeaderBar() {
    return isAndroid ? this.headerBar : this.parentController.headerBar;
  }

  initSearchView(): void {
    this.mySearchView = null;
    this.mySearchView = new SearchView({ flexGrow: 1, hint: 'Search', cursorColor: Color.BLACK });
    if (isAndroid) {
      this.mySearchView.textFieldBackgroundColor = Color.create(199, 199, 199);
    }
    this.mySearchView.on('searchBegin', () => {
      console.log('SearchView searchBegin');
    });
    this.mySearchView.on('searchEnd', () => {
      console.log('SearchView searchEnd');
    });
    this.mySearchView.on('textChanged', (text) => {
      console.log('SearchView textChanged: ', text);
      this._data = this._original.filter((val) => val.toLowerCase().includes(text.toLowerCase()));
      this.refreshListView();
    });
  }

  setHeaderBar() {
    this.myHeaderBarItem = new HeaderBarItem();
    this.myHeaderBarItem.image = this._searchActive ? Image.createFromFile('images://icon_close.png') : Image.createFromFile('images://icon_search.png');
    this.myHeaderBarItem.color = Color.WHITE;
    this.myHeaderBarItem.onPress = () => {
      if (this._searchActive) {
        this.setHeaderSearch(false);
        this.mySearchView.text = '';
        this.mySearchView.removeFocus();
      } else {
        this.setHeaderSearch(true);
        this.mySearchView.requestFocus();
      }
      this._searchActive = !this._searchActive;
      this.setHeaderBar();
    };
    this.headerBar.setItems([this.myHeaderBarItem]);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.setHeaderSearch(false);
    this.refreshListView();
  }

  onLoad() {
    super.onLoad();
    this.generateRandomData();
    this.initListView();
    this.initSearchView();
    this.setHeaderBar();
  }
}
