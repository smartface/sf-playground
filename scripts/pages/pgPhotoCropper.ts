import Multimedia from '@smartface/native/device/multimedia';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import SwipeView from '@smartface/native/ui/swipeview';
import GviMiniPhoto from 'components/GviMiniPhoto';
import PgPhotoCropperDesign from 'generated/pages/pgPhotoCropper';
import PgPhotoViewer from './pgPhotoViewer';
import { Router, Route } from '@smartface/router';
import { IImage } from '@smartface/native/ui/image/image';
import Page from '@smartface/native/ui/page';

export default class PgPhotoCropper extends PgPhotoCropperDesign {
  images: IImage[];
  swipeView: SwipeView;
  swipeViewPages: ReturnType<typeof PgPhotoViewer>[];
  activeIndex = 0;
  initialized = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.headerBar.title = ' ';
  }
  initializePhotoGridView() {
    this.gvPhotos.onItemBind = (gvi: GviMiniPhoto, index) => {
      gvi.image = this.images[index];
      gvi.active = index === this.activeIndex;
    };
    this.gvPhotos.layoutManager.onItemLength = () => GviMiniPhoto.itemWidth();
    this.gvPhotos.itemCount = this.images.length;
    this.gvPhotos.onItemSelected = (gvi, index) => this.swipeView.swipeToIndex(index, true);
    this.gvPhotos.refreshData();
  }
  setCropItem() {
    const leffItem = new HeaderBarItem({
      image: Image.createFromFile('images://icon_crop.png'),
      color: Color.WHITE,
      onPress: async () => {
        const asset = this.images[this.activeIndex];
        console.log('launching cropper');
        Multimedia.launchCropper({
          page: this,
          aspectRatio: { x: asset.width / asset.height, y: 1 },
          asset,
          enableFreeStyleCrop: true,
          onSuccess: (params) => {
            this.images[this.activeIndex] = params.image;
            this.gvPhotos.refreshData();
            this.initializeSwipeView();
          },
          onFailure: (e) => {
            console.error(e);
          }
        });
      }
    });
    const rightItem = new HeaderBarItem({
      image: Image.createFromFile('images://headerbar_done.png'),
      color: Color.WHITE,
      onPress: () => this.router.goBack()
    });
    this.headerBar.setLeftItem(leffItem);
    this.headerBar.setItems([rightItem]);
  }
  initializeSwipeView() {
    this.flex.removeAll();
    this.swipeViewPages = (this.images || []).map((image) => PgPhotoViewer({ image }));
    this.swipeView = new SwipeView({
      page: this,
      flexGrow: 1,
      pages: this.swipeViewPages as unknown as Page[]
    });
    // THIS IS NOT WORKING ON NTVE-BETA-2 for Android, To be tested after the TS migration.
    this.swipeView.on('pageSelected', (index) => {
      this.activeIndex = index;
      this.gvPhotos.refreshData();
    });
    this.activeIndex && this.swipeView.swipeToIndex(this.activeIndex, false);
    this.flex.addChild(this.swipeView, 'swipeView', '.grow-relative');
    this.flex.addStyleableChild(this.swipeView, 'swipeView', '.grow-relative');
    if (System.OS === System.OSType.IOS) {
      this.layout.applyLayout();
    }
  }

  onShow() {
    super.onShow?.();
    if (!this.initialized) {
      try {
        this.setCropItem();
        this.initializeSwipeView();
        this.initializePhotoGridView();
        this.initialized = true;
      } catch (err) {
        console.error(err.message, { stack: err.stack });
      }
    }
  }

  onLoad() {
    super.onLoad?.();
    this.activeIndex = this.route.getState().routeData.activeIndex;
    this.images = this.route.getState().routeData.images;
  }
}
