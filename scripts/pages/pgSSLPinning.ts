import PgSSLPinningDesign from 'generated/pages/pgSSLPinning';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Application from '@smartface/native/application';
import WebView from '@smartface/native/ui/webview';

//You should create new Page from UI-Editor and extend with it.
export default class PgSSLPinning extends PgSSLPinningDesign {
    myWebView: WebView;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgSSLPinning, superOnShow: () => void) {
    const { headerBar } = this;
    superOnShow();
    Application.statusBar.visible = false;
    headerBar.visible = false;

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgSSLPinning, superOnLoad: () => void) {
    superOnLoad();
    this.myWebView = new WebView({
        ios: {
            sslPinning: [
                {
                    host: "httpbin.org",
                    certificates: [],
                    validateCertificateChain: true,
                    validateHost: true
                }
            ]
        },
        onChangedURL: function (event: any) {
            console.log("Event Change URL: " + event.url);
            return true;
        },
        onError: function (event: any) {
            console.error("Event Error : " + event.message + ", URL: " + event.url);
        },
        onLoad: function (event: any) {
            console.info("Event Load: " + event.url);
        },
        onShow: function (event: any) {
            console.warn("Event Show: " + event.url);
        }
    });

    this.myWebView.android.page = this;

    this.myWebView.loadURL('https://httpbin.org');

    setTimeout(() => {
        this.myWebView.ios.sslPinning = undefined;
        this.myWebView.loadURL('https://www.smartface.io');
    }, 5000);

    //@ts-ignore
    this.layout.addChild(this.myWebView, "myWebView", ".sf-webView", {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
        flexProps: {
            positionType: "ABSOLUTE"
        }
    });
} 