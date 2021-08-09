import Page1Design from 'generated/pages/pgHeaderSearch';
import SearchView from '@smartface/native/ui/searchview';
import Color from '@smartface/native/ui/color';

export default class Page1 extends Page1Design {
    router: any;
    mySearchView: SearchView;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            this.router.push("/pages/page2", { message: "Hello World!" });
        }
    }
    initSearchView(): void {
        this.mySearchView = new SearchView();
        this.mySearchView.android.textFieldBorderRadius = 20;
        this.mySearchView.textFieldBackgroundColor = Color.WHITE;
        //@ts-ignore
        this.mySearchView.cursorColor = Color.BLACK;
        this.mySearchView.addToHeaderBar(this);
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(this: Page1, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(this: Page1, superOnLoad: () => void) {
    superOnLoad();
    this.initSearchView();
}
