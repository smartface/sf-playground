import PgListViewDynamicHeightDesign from 'generated/pages/pgListViewDynamicHeight';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviDynamicLine from 'components/LviDynamicLine';
import { faker } from '@faker-js/faker';

export default class PgListViewDynamicHeight extends withDismissAndBackButton(PgListViewDynamicHeightDesign) {
  private _data: string[] = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  generateRandomData() {
    this._data = new Array(50).fill(0).map((v, index) => {
      return 'START.' + faker.lorem.paragraph(Math.round(Math.random() * 10)) + 'END.';
    });
  }

  initListView() {
    this.lv.refreshEnabled = false;
    this.lv.onRowHeight = (index) => LviDynamicLine.getHeight(this._data[index]);
    this.lv.onRowBind = (listViewItem: LviDynamicLine, index) => {
      listViewItem.text = this._data[index];
      listViewItem.separatorVisible = this._data.length - 1 !== index;
    };
  }

  refreshListView() {
    this.lv.itemCount = this._data.length;
    this.lv.refreshData();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.refreshListView();
  }

  onLoad() {
    super.onLoad();
    this.generateRandomData();
    this.initListView();
  }
}
