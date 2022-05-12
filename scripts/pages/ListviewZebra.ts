import PgListviewZebraDesign from 'generated/pages/ListviewZebra';
import LviElement from 'components/LviElement';
import { Route, Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgListviewZebra extends withDismissAndBackButton(PgListviewZebraDesign) {
  elements = [...Array(20)].map((_, index) => ({
    key: `Element${index}`,
    value: `Element${index} Value`
  }));

  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initListView() {
    this.lvElements.rowHeight = LviElement.getHeight();
    this.lvElements.onRowBind = (listViewItem: LviElement, index: number) => {
      listViewItem.keyText = this.elements[index].key;
      listViewItem.valueText = this.elements[index].value;
      listViewItem.toggleZebra(index % 2 !== 0);
    };
    this.lvElements.refreshEnabled = false;
  }
  refreshListView() {
    this.lvElements.itemCount = this.elements.length;
    this.lvElements.refreshData();
  }

  onShow() {
    super.onShow();
    this.refreshListView();
    this.headerBar.title = 'Zebra ListView';
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
