import PgGlideDesign from 'generated/pages/pgGlide';
import Button from '@smartface/native/ui/button';
import ImageView from '@smartface/native/ui/imageview';
import Dialog from '@smartface/native/ui/dialog';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import { styleableComponentMixin } from '@smartface/styling-context';
import System from '@smartface/native/device/system';
import Hardware from '@smartface/native/device/hardware';
import Accelerometer from '@smartface/native/device/accelerometer';
import { DialogStyle } from '@smartface/native/ui/dialog/dialog';
import { withDismissAndBackButton } from '@smartface/mixins/lib/withDismissAndBackButton';
import { Router, Route } from '@smartface/router';

class StyleableActivityIndicator extends styleableComponentMixin(ActivityIndicator) {}
class StyleableImageView extends styleableComponentMixin(ImageView) {}

enum CacheTypes {
  'Memory Caching',
  'HTTP Caching',
  'Disk Caching'
}
const imageOptions = {
  count: 150,
  size: {
    width: 2800,
    height: 2000
  }
};

const { paddingLeft, paddingRight } = themeService.getStyle('.sf-page');
const IMAGE_WIDTH = Screen.width - (paddingLeft + paddingRight);

export default class PgGlide extends withDismissAndBackButton(PgGlideDesign) {
  dialog: Dialog;
  activityIndicator: StyleableActivityIndicator;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButtons() {
    let i = 1;
    const items = Object.values(CacheTypes).filter((value) => typeof value === 'string') as string[];
    for (let item of items) {
      const button = new Button();
      this.flOptions.addChild(button, `button${i}`, '.sf-button');
      button.text = item;
      button.on('press', () => {
        this.initImages(
          item === String(CacheTypes['Disk Caching'])
            ? CacheTypes['Disk Caching']
            : item === String(CacheTypes['HTTP Caching'])
            ? CacheTypes['HTTP Caching']
            : CacheTypes['Memory Caching']
        );
      });
      i++;
    }
  }
  initImages(type: CacheTypes) {
    this.dialog.show();
    this.svMain.layout.removeAll();

    for (let i = 1; i <= imageOptions.count; i++) {
      const imageView = new StyleableImageView({
        width: Math.round(IMAGE_WIDTH),
        height: Math.round(IMAGE_WIDTH / (imageOptions.size.width / imageOptions.size.height))
      });
      this.svMain.addChild(imageView, `image${i}`, '.sf-imageView #pgGlide-image');
      imageView.loadFromUrl({
        url: this.getImageEndpoint(i),
        useHTTPCacheControl: type === CacheTypes['HTTP Caching'],
        android: {
          useMemoryCache: type === CacheTypes['Memory Caching'],
          useDiskCache: type === CacheTypes['Disk Caching']
        }
      });
    }
    setTimeout(() => this.dialog.hide(), 500);
  }
  initDialog() {
    this.dialog = new Dialog({
      android: {
        themeStyle: DialogStyle.ThemeNoHeaderBar // Show StatusBar
        // isTransparent: true,
        // cancelable: true
      }
    });
    this.dialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
    this.dialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

    this.activityIndicator = new StyleableActivityIndicator();
    this.dialog.layout.addChild(this.activityIndicator);
  }
  getImageEndpoint(index: number) {
    return `https://picsum.photos/id/${index}/${imageOptions.size.width}/${imageOptions.size.height}`;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router)
  }

  onLoad() {
    super.onLoad();
    this.initButtons();
    this.initDialog();
  }
}
