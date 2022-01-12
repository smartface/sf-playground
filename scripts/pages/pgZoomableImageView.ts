import PgZoomableImageViewDesign from "generated/pages/pgZoomableImageView";
import ZoomableImageView from "@smartface/extension-zoomable-imageview";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgZoomableImageView extends withDismissAndBackButton(PgZoomableImageViewDesign) {
  zoomableImageView: InstanceType<typeof ZoomableImageView>;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initZoomableImageView() {
    this.zoomableImageView = new ZoomableImageView({
      width: 250,
      height: 250,
    });
    this.zoomableImageView.image = "images://smartface.png";
    this.zoomableImageView.minimumZoomScale = 1;
    this.zoomableImageView.android.mediumZoomScale = 2;
    this.zoomableImageView.maximumZoomScale = 3;

    this.layout.addChild(this.zoomableImageView);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
    this.initZoomableImageView();
  }
}
