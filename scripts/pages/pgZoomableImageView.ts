import PgZoomableImageViewDesign from 'generated/pages/pgZoomableImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import ZoomableImageView from '@smartface/native/ui/zoomableimageview';
import { IZoomableImageView } from '@smartface/native/ui/zoomableimageview/zoomableimageview';
import { ImageFillType } from '@smartface/native/ui/imageview/imageview';
import Color from '@smartface/native/ui/color';

export default class PgZoomableImageView extends withDismissAndBackButton(PgZoomableImageViewDesign) {
  zoomableImageView: IZoomableImageView;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initZoomableImageView() {
    this.zoomableImageView = new ZoomableImageView({
      flexGrow: 1
    });
    this.zoomableImageView.image = 'images://smartface.png';
    this.zoomableImageView.minimumZoomScale = 1;
    this.zoomableImageView.imageFillType = ImageFillType.ASPECTFIT;
    this.zoomableImageView.android.mediumZoomScale = 2;
    this.zoomableImageView.maximumZoomScale = 5;
    this.zoomableImageView.animated = true;

    this.addChild(this.zoomableImageView);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initZoomableImageView();
  }
}
