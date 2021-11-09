import PgWebSocketDesign from "generated/pages/pgWebSocket";
import WebSocket from "@smartface/native/net/websocket";
import Blob from "@smartface/native/global/blob";

export default class PgWebSocket extends PgWebSocketDesign {
  webSocket: WebSocket;
  constructor() {
    super();
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  }

  initWebSocket() {
    this.webSocket = new WebSocket({
      url: "wss://javascript.info/article/websocket/demo/hello",
    });
    this.webSocket.on(WebSocket.Events.Open, () => {
      console.log("Websocket opened.");
      console.log("Sending a string...");
      this.webSocket.send({ data: "some string" });
    });
    this.webSocket.on(WebSocket.Events.Close, (params: { code: number; reason?: string }) => {
      console.log(`Websocket closed with exit code: `, params.code);
    });
    this.webSocket.on(WebSocket.Events.Message, (e: { string: string; blob: Blob }) => {
      console.log("Message received.");
      console.log("Message: ", e.string);
      this.webSocket.close({ code: 1000 });
    });
  }
}

function onShow(this: PgWebSocket, superOnShow: () => void) {
  superOnShow();
}

function onLoad(this: PgWebSocket, superOnLoad: () => void) {
  superOnLoad();
  this.initWebSocket();
}
