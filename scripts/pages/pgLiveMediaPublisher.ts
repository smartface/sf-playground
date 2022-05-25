import PgLiveMediaPublisherDesign from 'generated/pages/pgLiveMediaPublisher';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LiveMediaPublisher from '@smartface/native/ui/livemediapublisher';
import Color from '@smartface/native/ui/color';
import { ScaleType } from '@smartface/native/ui/livemediaplayer/livemediaplayer';
import { styleableComponentMixin } from '@smartface/styling-context';

class StyleableLiveMediaPublisher extends styleableComponentMixin(LiveMediaPublisher) {}

export default class PgLiveMediaPublisher extends withDismissAndBackButton(PgLiveMediaPublisherDesign) {
  private liveMediaPublisher: StyleableLiveMediaPublisher;
  private _streaming = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnAction.on('press', () => this.startStreaming());
    this.btnCamera.on('press', () => this.switchCamera());
  }

  switchCamera() {
    this.liveMediaPublisher?.switchCamera();
  }

  startStreaming() {
    this._streaming = !this._streaming;
    this._streaming ? this.liveMediaPublisher?.start() : this.liveMediaPublisher?.stop();
    this.btnAction.text = this._streaming ? 'Stop Streaming' : 'Start Streaming';
  }

  /**
   * To test media publisher we need to create a rtmp server in our local network.
   * https://github.com/aler9/rtsp-simple-server
   *
   * Streaming
   *
   * Install the server above to your pc. Make sure your pc and phone is on the same network.
   * Update the outputUrl below with your pc ip address
   *
   * Watching
   *
   * To watch it you can use VLC Media Player
   * Open VLC Player, select Media on top left and click Open Network Stream
   * Write down this address rtmp://localhost/mystream
   * Make sure stream path is same as in outputUrl (mystream).
   */
  initLiveMediaPublisher() {
    this.liveMediaPublisher;
    this.liveMediaPublisher = new StyleableLiveMediaPublisher({
      flexGrow: 1,
      backgroundColor: Color.BLACK,
      onChange: (params) => {
        console.info(params.message, params);
      },
      outputUrl: 'rtmp://192.168.1.106/mystream'
    });
    this.flLiveMediaPublisher.addChild(this.liveMediaPublisher, 'liveMediaPublisher', '.grow-relative');
    this.liveMediaPublisher.startPreview();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initLiveMediaPublisher();
  }
}
