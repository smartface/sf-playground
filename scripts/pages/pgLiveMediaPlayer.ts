import PgLiveMediaPlayerDesign from 'generated/pages/pgLiveMediaPlayer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LiveMediaPlayer from '@smartface/native/ui/livemediaplayer';
import Color from '@smartface/native/ui/color';
import { ScaleType } from '@smartface/native/ui/livemediaplayer/livemediaplayer';
import { styleableComponentMixin } from '@smartface/styling-context';

class StyleableLiveMediaPlayer extends styleableComponentMixin(LiveMediaPlayer) {}

export default class PgLiveMediaPlayer extends withDismissAndBackButton(PgLiveMediaPlayerDesign) {
  private liveMediaPlayer: StyleableLiveMediaPlayer;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initLiveMediaPlayer() {
    this.liveMediaPlayer = new StyleableLiveMediaPlayer({
      flexGrow: 1,
      inputUrl: 'https://tv-trt1.medya.trt.com.tr/master_720.m3u8',
      backgroundColor: Color.BLACK,
      onChange: (params) => {
        console.info(params);
      },
      scaleType: ScaleType.ASPECTFILL
    });
    this.flLiveMediaPlayer.addChild(this.liveMediaPlayer, 'liveMediaPlayer', '.grow-relative');
  }

  startLiveMediaPlayer() {
    this.liveMediaPlayer?.start();
  }

  stopLiveMediaPlayer() {
    this.liveMediaPlayer?.stop();
  }
  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.startLiveMediaPlayer();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initLiveMediaPlayer();
  }
}
