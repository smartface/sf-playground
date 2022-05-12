import PgWebSocketDesign from 'generated/pages/WebSocket';
import WebSocket from '@smartface/native/net/websocket';
import Blob from '@smartface/native/global/blob';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';

export default class PgWebSocket extends withDismissAndBackButton(PgWebSocketDesign) {
  webSocket: WebSocket;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnReconnect.on('press', () => {
      this.webSocket?.close({ code: 1000 });
      this.initWebSocket();
    });
    this.btnDisconnect.on('press', () => {
      this.webSocket?.close({ code: 1000 });
    });
  }

  initWebSocket() {
    this.webSocket?.off('open', () => {});
    this.webSocket?.off('close', () => {});
    this.webSocket?.off('message', () => {});
    /**
     * For testing go to https://www.piesocket.com/websocket-tester and create a websocket testing lobby.
     * Put the url down below.
     */
    this.webSocket = new WebSocket({
      url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self'
    });
    this.webSocket.on('open', () => {
      console.log('Websocket opened.');
      console.log('Sending a string...');
      this.webSocket.send({ data: 'Hi, my OS is: ' + System.OS });
    });
    this.webSocket.on('close', (params: { code: number; reason?: string }) => {
      console.log(`Websocket closed with exit code: `, params.code);
    });
    this.webSocket.on('message', (e: { string: string; blob: Blob }) => {
      console.log(System.OS + ' | MessageReceived: ', e.string);
    });

    console.log('Websocket headers: ', this.webSocket.headers);
    console.log('Websocket url: ', this.webSocket.url);
    console.log('Websocket headers: ', this.webSocket.headers);
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
