import PgVideoViewDesign from 'generated/pages/pgVideoView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
import { themeService } from 'theme';

export default class PgVideoView extends withDismissAndBackButton(PgVideoViewDesign) {
  private _loopEnabled = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnGetInfo.on('press', () => this.getVideoInfo());
    this.btnCustomErrorMessage.on('press', () => this.customErrorMessage());
    this.btnLoadFile.on('press', () => this.loadFile());
    this.btnLoadURL.on('press', () => this.loadURL());
    this.btnCustomErrorMessage.on('press', () => this.customErrorMessage());
    this.btnSeekTo.on('press', () => this.seekTo45());
    this.btnStop.on('press', () => this.stop());
    this.btnLoopEnabled.on('press', () => this.switchLoopEnabled());
    this.swFastForward.on('toggleChanged', (value) => this.changeFastForward(value));
    this.swLoadingIndicator.on('toggleChanged', (value) => this.changeLoadingIndicator(value));
    this.swNextButtonEnabled.on('toggleChanged', (value) => this.changeNextButtonEnabled(value));
    this.swPreviousButtonEnabled.on('toggleChanged', (value) => this.changePreviousButtonEnabled(value));
    this.swRewindButtonEnabled.on('toggleChanged', (value) => this.changeRewindButtonEnabled(value));
    this.swShowController.on('toggleChanged', (value) => this.changeShowController(value));
  }

  switchLoopEnabled() {
    this.video.setLoopEnabled(!this._loopEnabled);
    this._loopEnabled = !this._loopEnabled;
    this.btnLoopEnabled.text = this._loopEnabled ? 'Disable Loop' : 'Enable Loop';
  }

  seekTo45() {
    const current = this.video.currentDuration;
    const totalDuration = this.video.totalDuration;
    const seekAmount = 45 * 1000; //45 seconds in milliseconds
    const target = current + seekAmount;
    if (current + seekAmount <= totalDuration) {
      this.video.seekTo(target);
    } else {
      this.video.seekTo(totalDuration);
    }
  }

  loadFile() {
    console.log('loadFile');
    this.video.loadFile(new File({ path: Path.AssetsUriScheme + 'sample_960x540.mp4' }));
  }

  loadURL() {
    console.log('loadURL');
    this.video.loadURL('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  }

  changeShowController(value: boolean) {
    this.video.android.showController = value;
  }

  changeRewindButtonEnabled(value: boolean) {
    this.video.android.rewindButtonEnabled = value;
  }

  changePreviousButtonEnabled(value: boolean) {
    this.video.android.previousButtonEnabled = value;
  }

  changeNextButtonEnabled(value: boolean) {
    this.video.android.nextButtonEnabled = value;
  }

  changeFastForward(value: boolean) {
    this.video.android.fastForwardButtonEnabled = value;
  }

  changeLoadingIndicator(value: boolean) {
    this.video.android.loadingIndicatorEnabled = value;
  }

  getVideoInfo() {
    console.info({
      currentDuration: this.video.currentDuration,
      totalDuration: this.video.totalDuration,
      isPlaying: this.video.isPlaying()
    });
  }

  stop() {
    this.video.stop();
  }

  customErrorMessage() {
    this.video.android.customErrorMessage = 'CustomMessage';
  }

  initVideoView() {
    this.video.on('fullScreenModeChanged', (a) => console.log('fullScreenModeChanged', a));
    this.video.on('controllerVisibilityChange', (a) => console.log('controllerVisibilityChange', a));
    this.video.on('failure', (a) => console.error('failure: ', a));
    this.video.on('finish', (a) => console.log('finish: ', a));
    this.video.on('ready', () => {
      console.log('readyToPlay');
      this.video.play();
    });
    this.video.ios.entersFullScreenWhenPlaybackBegins = true;
    this.video.ios.exitsFullScreenWhenPlaybackEnds = true;
    this.video.page = this;
    this.video.android.controllerShowTimeoutMs = 2000;
  }

  onHide(): void {
    this.video.stop();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initVideoView();
  }
}
