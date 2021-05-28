import PgButtonPressDesign from 'generated/pages/pgButtonPress';
import WebViewBridge from 'sf-extension-utils/lib/webviewbridge';

export default class PgButtonPress extends PgButtonPressDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initWebViewBridge() {
        const url = "https://az793023.vo.msecnd.net/examples/webviewbridge/buttonevent.html";
        const script = `
            const btn = document.getElementById("btn");
            btn.onclick = function() {
            window.boubleEvent("buttonPress");
            };
        `;

        //Within constructor
        const wvb = new WebViewBridge({
            webView: this.webView1, //WebView. Should be assigned from UI editor.
            source: url
        });
        wvb.on("buttonPress", (data) => {
            const text = "Button pressed";
            console.info(text);
            alert(text);
            //Do your own logic
        });

        wvb.ready().then(() => {
            wvb.evaluateJS(script);
        });
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initWebViewBridge();
}
