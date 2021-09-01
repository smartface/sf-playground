import PgAppleDevicesDesign from 'generated/pages/pgAppleDevices';
import { getModelName } from "@smartface/extension-utils/lib/appleDevices";
import LviPages from 'components/LviPages';
import deviceMappings from "@smartface/extension-utils/lib/appleDevices/deviceMapping.json";
import copy from "@smartface/extension-utils/lib/copy";
import { getOrientationOnchage } from "@smartface/extension-utils/lib/orientation";
import { createAsyncTask } from "@smartface/extension-utils/lib/async";
export default class PgAppleDevices extends PgAppleDevicesDesign {
    dataSet: string[];
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.onOrientationChange = () => {
            const orientation = getOrientationOnchage();
            createAsyncTask(() => {
                setTimeout(() => {
                    this.scrambleDatasetOnOrientationChange();
                }, 10)
            }, {})
                .then(() => this.refreshListView())
        }
    }

    scrambleDatasetOnOrientationChange() {
        this.dataSet.sort(() => .5 - Math.random());
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
        }
    }

    refreshListView() {
        this.lvAppleDevices.itemCount = this.dataSet.length;
        this.lvAppleDevices.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = getModelName();
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initCopyDeviceMapping();
    this.initListView();
}
