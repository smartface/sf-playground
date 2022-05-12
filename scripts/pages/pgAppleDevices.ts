import PgAppleDevicesDesign from 'generated/pages/pgAppleDevices';
import { getModelName } from '@smartface/extension-utils/lib/appleDevices';
import LviPages from 'components/LviPages';
import deviceMappings from '@smartface/extension-utils/lib/appleDevices/deviceMapping.json';
import copy from '@smartface/extension-utils/lib/copy';
import { getOrientationOnchage } from '@smartface/extension-utils/lib/orientation';
import { createAsyncTask } from '@smartface/extension-utils/lib/async';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgAppleDevices extends withDismissAndBackButton(PgAppleDevicesDesign) {
  dataSet: string[];
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.onOrientationChange = () => {
      const orientation = getOrientationOnchage();
      createAsyncTask(() => {
        this.scrambleDatasetOnOrientationChange();
      }, {}).then(() => this.refreshListView());
    };
  }

  scrambleDatasetOnOrientationChange() {
    this.dataSet.sort(() => 0.5 - Math.random());
  }

  initCopyDeviceMapping() {
    const copiedJSONFile = copy(deviceMappings);
    this.dataSet = Object.values(copiedJSONFile);
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
    this.headerBar.title = getModelName();
    this.refreshListView();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initCopyDeviceMapping();
    this.initListView();
  }
}
