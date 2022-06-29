import PgSpriteViewDesign from 'generated/pages/pgSpriteView';
import Image from '@smartface/native/ui/image';
import ImageView from '@smartface/native/ui/imageview';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import SpriteView from '@smartface/native/ui/spriteview';
import { ImageFillType } from '@smartface/native/ui/imageview/imageview';

export default class PgSpriteView extends withDismissAndBackButton(PgSpriteViewDesign) {
  spriteView: SpriteView;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initSpriteView() {
    this.spriteView = new SpriteView({
      width: 100,
      height: 125,
      imageFillType: ImageFillType.ASPECTFIT
    });
    const sheet = Image.createFromFile('assets://braid.png');

    this.spriteView.setSprite({
      sheet: sheet, // Image for the frame
      frameX: 7, // Distinct image count on X axis
      frameY: 4, // Distinct image count on Y axis
      frameCount: 27 // Frame count of the image
    });
    this.layout.addChild(this.spriteView);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.spriteView.play(1000);
  }

  onLoad() {
    super.onLoad();
    this.initSpriteView();
  }
}
