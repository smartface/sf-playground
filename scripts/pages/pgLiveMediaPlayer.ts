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
  private isPlaying = false;
  private isAudioEnabled = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnAction.on('press', () => {
      if (this.isPlaying) {
        this.liveMediaPlayer?.stop();
        this.btnAction.text = 'Start';
        this.isPlaying = false;
      } else {
        this.liveMediaPlayer?.start();
        this.btnAction.text = 'Stop';
        this.isPlaying = true;
      }
    });
    this.btnPause.on('press', () => {
      if (this.isPlaying) {
        this.liveMediaPlayer?.pause();
        this.btnPause.text = 'Resume';
        this.isPlaying = false;
      } else {
        this.liveMediaPlayer?.start();
        this.btnPause.text = 'Pause';
        this.isPlaying = true;
      }
    });
    this.btnAudio.on('press', () => this.changeAudio());
  }

  changeAudio() {
    this.isAudioEnabled = !this.isAudioEnabled;
    this.liveMediaPlayer.audioEnabled = this.isAudioEnabled;
    this.btnAudio.text = this.isAudioEnabled ? 'Disable Audio' : 'Enable Audio';
  }

  initLiveMediaPlayer() {
    this.liveMediaPlayer = new StyleableLiveMediaPlayer({
      flexGrow: 1,
      inputUrl: 'https://tv-trt1.medya.trt.com.tr/master_720.m3u8',
      backgroundColor: Color.BLACK,
      onChange: (params) => {
        console.info(params.message, params);
      },
      scaleType: ScaleType.ASPECTFILL
    });
    this.flLiveMediaPlayer.addChild(this.liveMediaPlayer, 'liveMediaPlayer', '.grow-relative');
  }
  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
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
