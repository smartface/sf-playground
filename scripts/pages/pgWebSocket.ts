import PgWebSocketDesign from 'generated/pages/pgWebSocket';
import WebViewBridge from 'sf-extension-utils/lib/webviewbridge';

export default class PgWebSocket extends PgWebSocketDesign {
    wvb: WebViewBridge;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initWebViewBridge() {
        const url = "https://www.websocket.org/echo.html";
        const script = `
        window.conn.onmessage = function(superOnMessage, message) {
        superOnMessage(message);
        window.boubleEvent("message", {
            text: event.data
        });
        }.bind(window.conn, window.conn.onmessage.bind(window.conn));
        `;

        //Within constructor
        const wvb = new WebViewBridge({
            webView: this.webView1, //WebView
            source: url
        });
        this.wvb = wvb;

        wvb.on("buttonPress", (data) => {
            const message = `Message recieved containing: ${data.text}`
            console.log(message);
            alert(message);
            //Do your own logic
        });

        wvb.ready().then(() => {
            //@ts-ignore
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
