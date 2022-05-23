import PgListViewMaterialDesign from 'generated/pages/pgListViewMaterial';
import FlMaterialTextBox from '@smartface/component-materialtextbox';
import LviMaterialTextBox from 'components/LviMaterialTextBox';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router } from '@smartface/router';

export default class PgListViewMaterial extends withDismissAndBackButton(PgListViewMaterialDesign) {
  data: ReturnType<PgListViewMaterial['generateMaterialData']>[] = Array.from(Array(30), () => this.generateMaterialData());
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  private generateMaterialData(): FlMaterialTextBox['options'] {
    return {
      hint: 'test',
      text: 'asdf'
    };
  }

  initListView() {
    this.lvMain.refreshEnabled = false;
    this.lvMain.rowHeight = LviMaterialTextBox.getHeight();
    this.lvMain.onRowBind = (item: LviMaterialTextBox, index: number) => {
      const currentData = this.data[index];
      console.log('curr ', currentData);
      item.mtb.hint = index + ': ' + currentData.hint;
      item.mtb.text = currentData.text;
      Object.assign(item, currentData);
    };
  }

  refreshListView() {
    this.lvMain.itemCount = this.data.length;
    this.lvMain.refreshData();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.refreshListView();
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
