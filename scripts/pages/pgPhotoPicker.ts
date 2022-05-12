import PgPhotoPickerDesign from 'generated/pages/pgPhotoPicker';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Multimedia from '@smartface/native/device/multimedia';

export default class PgPhotoPicker extends withDismissAndBackButton(PgPhotoPickerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnPick.on('press', () => {
      Multimedia.pickMultipleFromGallery({
        android: { fixOrientation: true },
        type: Multimedia.Type.IMAGE,
        page: this,
        onSuccess: ({ assets }) => {
          const images = assets.map((asset) => asset.image);
          this.router.push('PgPhotoCropper', { images, activeIndex: Math.min(parseInt(this.tbIndex.text) || 0, assets.length - 1) });
        }
      });
    });
  }

  public onShow() {
    super.onShow?.();
  }

  public onLoad() {
    super.onLoad?.();
  }
}
