import PageHideShowDesign from 'generated/pages/pageHideShow';

export default class PageHideShow extends PageHideShowDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initComponents() {
        this.btnHide.onPress = () => {
            this.webView1.evaluateJS('document.getElementById("item").style.display="none";', () => { });
        };
        this.btnShow.onPress = () => {
            this.webView1.evaluateJS('document.getElementById("item").style.display="flex";', () => { });
        }
    }
}


function onShow(superOnShow: () => void) {
    superOnShow();
    this.webView1.loadURL("https://az793023.vo.msecnd.net/examples/sf-core/webview/hide-show.html");
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = "Hide Show";
    this.initComponents();
}