import PgArtDesign from 'generated/pages/pgArt';
import CircularProgressBar from '@smartface/extension-utils/lib/art/CircularProgressBar';
import EmojiAnimation from '@smartface/extension-utils/lib/art/EmojiAnimation';
import Image from '@smartface/native/ui/image';
import { withDismissAndBackButton } from '@smartface/mixins';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';

const TEST_EMOJI_BASE64 =
  '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';

const ArtTypes = {
  EMOJI_ANIMATION: 'Emoji Animation',
  CIRCULAR_PROGRESS_BAR: 'Circular Progress Bar'
};

export default class PgArt extends withDismissAndBackButton(PgArtDesign) {
  emojiIntervalCode: Timeout;
  emojiAnimation: EmojiAnimation;
  circularProgressBar: CircularProgressBar;
  emojis: string[];
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.emojis = [`data:image/png;base64,${TEST_EMOJI_BASE64}`, `data:image/png;base64,${this.getBase64OfSmartfacemage()}`, `data:image/png;base64,eymBASDASd`];
  }

  initSwitch() {
    this.swArtToggle.on('toggleChanged', (toggle) => {
      console.info('toggleChange: ', toggle);
      this.toggleBetweenArt(toggle);
    });
    // this.swArtToggle.android.thumbImage = 'images://arrow_back.png'
    this.swArtToggle.toggleOnColor = Color.BLUE;
    this.swArtToggle.android.toggleOffColor = Color.GRAY;
    this.swArtToggle.thumbOnColor = Color.RED;
    this.swArtToggle.thumbOffColor = Color.DARKGRAY;
  }

  toggleBetweenArt(toggle: boolean) {
    this.lbArtType.text = toggle ? ArtTypes.EMOJI_ANIMATION : ArtTypes.CIRCULAR_PROGRESS_BAR;
    this.emojiIntervalCode && clearTimeout(this.emojiIntervalCode);
    toggle ? this.initEmojiAnimation() : this.initCircularProgressBar();
  }

  getBase64OfSmartfacemage(): string {
    const smartfaceImage = Image.createFromFile('images://smartface.png');
    return smartfaceImage.toBlob().toBase64();
  }

  initEmojiAnimation() {
    this.emojiAnimation = new EmojiAnimation({
      emojis: this.emojis,
      webView: this.wvMain
    });
    this.emojiIntervalCode = setInterval(() => {
      this.emojis.forEach((_, index) => {
        this.emojiAnimation.playEmoji(index, 2);
      });
    }, 200);
  }

  initCircularProgressBar() {
    this.circularProgressBar = new CircularProgressBar({
      webView: this.wvMain
    });
    this.circularProgressBar.value = 55;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initSwitch();
    this.toggleBetweenArt(true);
  }
}
