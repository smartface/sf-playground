import PgGifImageViewDesign from 'generated/pages/pgGifImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import GifImage from '@smartface/native/ui/gifimage';

export default class PgGifImageView extends withDismissAndBackButton(PgGifImageViewDesign) {
  private _interval: NodeJS.Timer;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnStart.on('press', () => this.giv.startAnimating());
    this.btnStop.on('press', () => this.giv.stopAnimating());
  }

  initGif() {
    //@ts-ignore
    this.giv.ios.loopCompletionCallback = () => console.info('loopCompletionCallback');
    this.giv.gifImage = GifImage.createFromFile('assets://countdown.gif');
  }

  getInfo() {
    this._interval = setInterval(() => {
      console.info({
        currentFrame: this.giv.currentFrame,
        currentFrameIndex: this.giv.currentFrameIndex,
        isAnimating: this.giv.isAnimating
      });
    }, 2000);
  }

  onHide() {
    clearInterval(this._interval);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initGif();
  }

  onLoad() {
    super.onLoad();
    this.getInfo();
  }
}
