import MainPageDesign from 'generated/pages/mainPage';
import LviPages from 'components/LviPages';
import * as Pages from '.';

export default class MainPage extends MainPageDesign {
    pages = Object.keys(Pages);
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {
        this.lvPages.refreshEnabled = false;
        this.lvPages.rowHeight = 54;
        this.lvPages.onRowBind = (listViewItem: LviPages, index) => {
            listViewItem.lblPageName.text = this.pages[index];
        }
        this.lvPages.onRowSelected = (listViewItem: LviPages, index) => {
            this.router.push(`/pages/${this.pages[index]}`)
        }
    }

    refreshListView() {
        this.lvPages.itemCount = this.pages.length;
        this.lvPages.refreshData();
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
    this.refreshListView();
}


function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
}
