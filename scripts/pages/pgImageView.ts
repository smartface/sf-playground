import PgImageViewDesign from 'generated/pages/pgImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Image from '@smartface/native/ui/image';
import { IImage } from '@smartface/native/ui/image/image';
import Picker from '@smartface/native/ui/picker';
import Color from '@smartface/native/ui/color';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
const baseImage = 'images://smartface.png';

export default class PgImageView extends withDismissAndBackButton(PgImageViewDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.svAutoMirror.on('toggleChanged', (toggle) => this.setAutoMirrored(toggle));
        this.btnCompress.on('press', () => this.compress());
        this.btnCreateSystemIcon.on('press', () => this.createSystemIcon());
        this.btnCrop.on('press', () => this.crop());
        this.btnResize.on('press', () => this.resize());
        this.btnRotate.on('press', () => this.rotate());
        this.btnRound.on('press', () => this.round());
        this.btnFillType.on('press', () => this.fillType());
        this.btnTintColor.on('press', () => this.setTintColor());
        this.btnFetchFromUrl.on('press', () => this.fetchFromUrl());
        this.btnLoadFromFile.on('press', () => this.loadFromFile());
        this.btnLoadFromUrl.on('press', () => this.loadFromUrl());
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
            useHTTPCacheControl: false,
            android: {
                useDiskCache: false,
                useMemoryCache: false
            }
        });
    }

    setTintColor() {
        this.imgFillTypes.style.apply({ tintColor: '#FF0000' });
        this.imgFillTypes.tintColor = Color.RED;
    }

    fillType() {
        const picker = new Picker();
        const fills = [
            'ASPECTFILL',
            'ASPECTFIT',
            'BOTTOMCENTER',
            'BOTTOMLEFT',
            'BOTTOMRIGHT',
            'MIDCENTER',
            'MIDLEFT',
            'MIDRIGHT',
            'NORMAL',
            'STRETCH',
            'TOPCENTER',
            'TOPLEFT',
            'TOPRIGHT'
        ];
        picker.items = fills;
        picker.on('selected', (index) => {
            console.info('selected: ', index);
            this.imgFillTypes.style.apply({ imageFillType: fills[index] });
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
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
    }
}
