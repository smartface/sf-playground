import PgAppleDevicesDesign from 'generated/pages/pgAppleDevices';
import Hardware from '@smartface/native/device/hardware';
import LviPages from 'components/LviPages';
import deviceMappings from '@smartface/native/device/hardware/deviceMapping.json';
import copy from '@smartface/extension-utils/lib/copy';
import AsyncTask from '@smartface/native/global/asynctask'
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgAppleDevices extends withDismissAndBackButton(PgAppleDevicesDesign) {
  dataSet: string[];
  constructor(private router?: Router, private route?: Route) {
    super({});
    const ali = this.scrambleDatasetOnOrientationChange;
    this.onOrientationChange = () => {
        this.runAsyncTask();
    }

  }
  runAsyncTask(){
    const asyncTask = new AsyncTask();
    asyncTask.task =  () => {
        this.scrambleDatasetOnOrientationChange();
    };
    asyncTask.onComplete =  () => {
        this.refreshListView();
    };
    asyncTask.run();
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
    this.headerBar.title = Hardware.modelName;
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
