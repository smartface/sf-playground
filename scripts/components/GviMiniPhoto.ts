import GviMiniPhotoDesign from 'generated/my-components/GviMiniPhoto';
import Image from '@smartface/native/ui/image';
import { themeService } from 'theme';
import { IImage } from '@smartface/native/ui/image/image';
const { borderWidth: activeBorder, borderColor } = themeService.getNativeStyle('.gviMiniPhoto-flex-active');
const width = themeService.getNativeStyle('.gviMiniPhoto').width;

export default class GviMiniPhoto extends GviMiniPhotoDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
    this.flex.borderColor = borderColor;
  }
  set image(image: IImage) {
    this.img.image = image;
  }
  set active(value: boolean) {
    this.flex.borderWidth = value ? activeBorder : 0;
  }
  static itemWidth(): number {
    return width;
  }
}
