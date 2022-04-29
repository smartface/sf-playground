import PgImageViewDesign from 'generated/pages/pgImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Image from '@smartface/native/ui/image';
import { SwitchEvents } from '@smartface/native/ui/switch/switch-events';
import { IImage } from '@smartface/native/ui/image/image';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import Picker from '@smartface/native/ui/picker';
import Color from '@smartface/native/ui/color';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
const baseImage = 'images://smartface.png';

export default class PgImageView extends withDismissAndBackButton(PgImageViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.svAutoMirror.on(SwitchEvents.ToggleChanged, (toggle) => this.setAutoMirrored(toggle));
    this.btnCompress.on(ButtonEvents.Press, () => this.compress());
    this.btnCreateSystemIcon.on(ButtonEvents.Press, () => this.createSystemIcon());
    this.btnCrop.on(ButtonEvents.Press, () => this.crop());
    this.btnResize.on(ButtonEvents.Press, () => this.resize());
    this.btnRotate.on(ButtonEvents.Press, () => this.rotate());
    this.btnRound.on(ButtonEvents.Press, () => this.round());
    this.btnFillType.on(ButtonEvents.Press, () => this.fillType());
    this.btnTintColor.on(ButtonEvents.Press, () => this.setTintColor());
    this.btnFetchFromUrl.on(ButtonEvents.Press, () => this.fetchFromUrl());
    this.btnLoadFromFile.on(ButtonEvents.Press, () => this.loadFromFile());
    this.btnLoadFromUrl.on(ButtonEvents.Press, () => this.loadFromUrl());
  }

  fetchFromUrl() {
    this.imgFillTypes.fetchFromUrl({
      url: 'https://cdn.smartface.io/docs/logo.png',
      onFailure: () => console.error('couldnt fetchFromUrl'),
      onSuccess: (image: Image) => {
        console.info('success fetchFromUrl');
        this.imgFillTypes.image = image;
      },
      placeholder: Image.createFromFile('imageview_preview.png')
    });
  }

  loadFromFile() {
    this.imgFillTypes.loadFromFile({
      file: new File({ path: Path.AssetsUriScheme + 'icon.png' })
    });
  }

  loadFromUrl() {
    this.imgFillTypes.loadFromUrl({
      url: 'https://cdn.smartface.io/docs/logo.png',
      onFailure: () => console.error('couldnt loadFromUrl'),
      onSuccess: () => console.log('success loadFromUrl'),
      fade: true,
      placeholder: Image.createFromFile('imageview_preview.png'),
      useHTTPCacheControl: true
    });
  }

  workaround() {
    this.imgOriginal.dispatch({ type: 'updateUserStyle', userStyle: { imageFillType: 'ASPECTFILL' } });
    this.imgMain.dispatch({ type: 'updateUserStyle', userStyle: { imageFillType: 'ASPECTFILL' } });
  }

  setTintColor() {
    this.imgFillTypes.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        tintColor: '#FF0000'
      }
    });
    this.imgFillTypes.tintColor = Color.RED;
  }

  fillType() {
    const picker = new Picker();
    const fills = ['ASPECTFILL', 'ASPECTFIT', 'BOTTOMCENTER', 'BOTTOMLEFT', 'BOTTOMRIGHT', 'MIDCENTER', 'MIDLEFT', 'MIDRIGHT', 'NORMAL', 'STRETCH', 'TOPCENTER', 'TOPLEFT', 'TOPRIGHT'];
    picker.items = fills;
    picker.on('selected', (index) => {
      this.imgFillTypes.dispatch({
        type: 'updateUserStyle',
        userStyle: { imageFillType: fills[index] }
      });
    });
    picker.show();
  }

  printReadonlyProps(image?: IImage) {
    console.log({
      ios_flipsForRightToLeftLayoutDirection: image?.ios?.flipsForRightToLeftLayoutDirection,
      ios_renderingMode: image?.ios?.renderingMode,
      height: image?.height,
      width: image?.width
    });
  }

  setAutoMirrored(toggle: boolean) {
    console.log('setAutoMirrored', toggle);
    const image = Image.createFromFile(baseImage);
    image.autoMirrored = toggle;
    this.imgMain.image = image;
    this.printReadonlyProps(image);
  }

  createSystemIcon() {
    console.log('createSystemIcon');
    const image = Image.android.createSystemIcon('alert_dark_frame');
    this.imgMain.image = image;
    this.printReadonlyProps(image);
  }

  crop() {
    const defImage = Image.createFromFile(baseImage);
    defImage.crop(
      0,
      0,
      200,
      100,
      ({ image }) => {
        this.imgMain.image = image;
        this.printReadonlyProps(image);
      },
      (e) => console.error(e)
    );
  }

  resize() {
    const defImage = Image.createFromFile(baseImage);
    defImage.resize(
      600,
      100,
      ({ image }) => {
        this.imgMain.image = image;
        this.printReadonlyProps(image);
      },
      (e) => console.error(e)
    );
  }

  rotate() {
    const defImage = Image.createFromFile(baseImage);
    defImage.rotate(
      33,
      ({ image }) => {
        this.imgMain.image = image;
        this.printReadonlyProps(image);
      },
      (e) => console.error(e)
    );
  }

  round() {
    const defImage = Image.createFromFile(baseImage);
    const rounded = defImage.android.round(defImage.height / 2);
    this.imgMain.image = rounded;
    this.printReadonlyProps(rounded);
  }

  compress() {
    console.log('compress');
    const image = Image.createFromFile(baseImage);
    image.compress(
      Image.Format.PNG,
      10,
      ({ blob }) => {
        console.log(`Before Compression: ${image.toBlob().size} | After compression: ${blob.size}`);
        const compressed = Image.createFromBlob(blob);
        this.imgMain.image = compressed;
        this.printReadonlyProps(compressed);
      },
      (err) => console.error(err)
    );
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.workaround();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
