import PgAppleDevicesDesign from 'generated/pages/pgAppleDevices';
import LviPages from 'components/LviPages';
import copy from '@smartface/extension-utils/lib/copy';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Hardware from '@smartface/native/device/hardware';
import AsyncTask from '@smartface/native/global/asynctask';

export default class PgAppleDevices extends withDismissAndBackButton(PgAppleDevicesDesign) {
  dataSet: string[];
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.onOrientationChange = (e) => {
      const asyncTask = new AsyncTask();
      asyncTask.once('complete', () => {
        this.scrambleDatasetOnOrientationChange();
        this.refreshListView();
      });
      asyncTask.run();
    };
  }

  scrambleDatasetOnOrientationChange() {
    this.dataSet.sort(() => 0.5 - Math.random());
  }
  initListView() {
    this.lvAppleDevices.refreshEnabled = false;
    this.lvAppleDevices.rowHeight = 54;
    this.lvAppleDevices.onRowBind = (listViewItem: LviPages, index) => {
      listViewItem.lblPageName.text = this.dataSet[index];
    };
  }

  refreshListView() {
    this.lvAppleDevices.itemCount = this.dataSet.length;
    this.lvAppleDevices.refreshData();
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.headerBar.title = Hardware.modelName;
    this.refreshListView();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
