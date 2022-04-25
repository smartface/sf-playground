import PageSampleDesign from 'generated/pages/pgHttp';
import Application from '@smartface/native/application';
import ImageView from '@smartface/native/ui/imageview';
import Http from '@smartface/native/net/http';
import Image from '@smartface/native/ui/image';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';

class StyleableImageView extends styleableComponentMixin(ImageView) {}

//You should create new Page from UI-Editor and extend with it.
export default class PgHttp extends PageSampleDesign {
  myImageView: StyleableImageView;
  myHttp = new Http();
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  requestImage(): void {
    this.myHttp.requestImage({
      method: 'GET',
      url: 'https://httpbin.org/image/png',
      onLoad: (e: { statusCode: number; headers: { [key: string]: string }; image: Image }): void => {
        // Image loaded.
        this.myImageView.image = e.image;
      },
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }): void => {
        // Http request image failed.
        alert(e.message);
      }
    });

    this.myImageView = new StyleableImageView();
    this.addChild(this.myImageView, 'myImageView', '.sf-imageView', {
      width: 100,
      height: 100,
      flexProps: {
        alignSelf: 'CENTER'
      },
      imageFillType: ImageView.FillType.STRETCH
    });
  }
  onShow() {
    super.onShow();
    const { headerBar } = this;
    Application.statusBar.visible = false;
    headerBar.visible = false;
  }

  onLoad() {
    super.onLoad();
    this.requestImage();
  }
}
