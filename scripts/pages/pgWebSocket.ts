import PgWebSocketDesign from "generated/pages/pgWebSocket";
import WebSocket from "@smartface/native/net/websocket";
import Blob from "@smartface/native/global/blob";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";


export default class PgWebSocket extends withDismissAndBackButton(PgWebSocketDesign) {
  webSocket: WebSocket;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initWebSocket() {
    this.webSocket = new WebSocket({
      url: "wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self",
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

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initWebSocket();
  }
}
