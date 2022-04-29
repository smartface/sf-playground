import PgGifImageViewDesign from 'generated/pages/pgGifImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
import GifImage from '@smartface/native/ui/gifimage';

export default class PgGifImageView extends withDismissAndBackButton(PgGifImageViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initGif() {
    // this.giv.gifImage = GifImage.createFromFile('assets://countdown.gif');
    this.giv.loadFromFile({ file: new File({ path: Path.AssetsUriScheme + 'countdown.gif' }) });
  }
  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initGif();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
