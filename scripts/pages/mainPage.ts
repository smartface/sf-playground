import MainPageDesign from 'generated/pages/mainPage';
import LviPages from 'components/LviPages';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Page from '@smartface/native/ui/page';
import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';

export default class MainPage extends withDismissAndBackButton(MainPageDesign) {
    _pages: ConstructorOf<Page>[] = [];
    _searchStrings: string[] = [];
    _searchKeys: string[] = [];
    constructor(private router?: Router, private route?: Route, params?: any) {
        super({});
        this.lblDisclaimer.on('touchEnded', () => {
            //   console.info('sliderDrawer.state: ', Application.sliderDrawer.state);
            //   Application.sliderDrawer.show();
        });
        // this.testing.on('touchEnded', () => {
        //   console.log('selamlar');
        // });
    }

    initListViewIndex() {
        this.flListViewIndex.indexes = this._searchKeys;
        this.flListViewIndex.onItemSelect = (selectedLabel: string) => {
            const indexToScroll = this._searchStrings.findIndex((ss) => ss[0] === selectedLabel);
            if (indexToScroll > -1) {
                this.lvPages.scrollTo(indexToScroll, false);
            }
        };
    }

    initListView() {
        this.lvPages.refreshEnabled = false;
        this.lvPages.rowHeight = 54;
        this.lvPages.onRowBind = (listViewItem: LviPages, index) => {
            listViewItem.lblPageName.text = this._searchStrings[index];
        };
        this.lvPages.onRowSelected = (listViewItem: LviPages, index) => {
            this.router.push(`${this.pages[index].name}`);
        };
    }

    refreshListView() {
        this.lvPages.itemCount = this.pages.length;
        this.initListViewIndex();
        this.lvPages.refreshData();
    }

    onShow() {
        super.onShow();
        const statusBarHeight = System.OS === System.OSType.ANDROID ? Application.statusBar.height : 0;
        this.flListViewIndex.topMargin =
            (System.OS === System.OSType.ANDROID ? this.headerBar.height : this.parentController.headerBar.height || 0) + statusBarHeight;
        this.flListViewIndex.style.apply({ top: this.flListViewIndex.topToDispatch() - this.flListViewIndex.topMargin });
    }

    onLoad() {
        super.onLoad();
        this.headerBar.leftItemEnabled = false;
        this.initListView();
    }

    cutPgFromPageName(pageName: string) {
        return pageName.substring(0, 2) === 'Pg' ? pageName.slice(2) : pageName;
    }

    set pages(value) {
        this._searchKeys = [];
        this._searchStrings = [];
        this._pages = value.sort((a, b) => {
            const aTextWithoutPrefix = this.cutPgFromPageName(a.name);
            const bTextWithoutPrefix = this.cutPgFromPageName(b.name);
            if (aTextWithoutPrefix < bTextWithoutPrefix) {
                return -1;
            } else {
                return 1;
            }
        });
        this._pages.forEach((a) => {
            const textWithoutPrefix = this.cutPgFromPageName(a.name);
            this._searchStrings.push(textWithoutPrefix);
            const firstCharacter = textWithoutPrefix.slice(0, 1);
            if (!this._searchKeys.includes(firstCharacter)) {
                this._searchKeys.push(firstCharacter);
            }
        });
        this._searchKeys = this._searchKeys.sort();
        this.refreshListView();
    }

    get pages() {
        return this._pages;
    }
}
