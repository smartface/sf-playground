import MainPageDesign from 'generated/pages/mainPage';
import LviPages from 'components/LviPages';

export default class MainPage extends MainPageDesign {
    pages: (typeof MainPage)[] = [];
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
            listViewItem.lblPageName.text = this.pages[index].name;
        }
        this.lvPages.onRowSelected = (listViewItem: LviPages, index) => {
            this.router.push(`${this.pages[index].name}`)
        }
    }

    refreshListView() {
        this.lvPages.itemCount = this.pages.length;
        this.lvPages.refreshData();
    }
}

function onShow(this: MainPage, superOnShow: () => void) {
    superOnShow();
    this.refreshListView();
}


function onLoad(this: MainPage, superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
}
