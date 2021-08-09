import PgHeaderImageDesign from 'generated/pages/pgHeaderImage';
import Image from '@smartface/native/ui/image';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Color from '@smartface/native/ui/color';

export default class PgHeaderImage extends PgHeaderImageDesign {
	constructor() {
		super();
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initButtonClicks() {
        this.btnDirectImage.onPress = () => this.addHeaderWithDirectImage();
        this.btnStyle.onPress = () => this.addHeaderWithGetCombinedStyle();
    }
    addHeaderWithDirectImage() {
        const imageHeaderBarItem = new HeaderBarItem();
        imageHeaderBarItem.image = 'images://smartface.png';
        imageHeaderBarItem.color = Color.BLACK; // For Android
        /** 
         * Alternative usage :
         * imageHeaderBarItem.image = Image.createFromFile('images://smartface.png');
        */
        this.headerBar.setItems([imageHeaderBarItem]);
    }

    addHeaderWithGetCombinedStyle() {
        const imageHeaderBarItem = new HeaderBarItem();
        imageHeaderBarItem.image = getCombinedStyle('#pgHeaderImage').image;
        this.headerBar.setItems([imageHeaderBarItem]);
    }
}

function onShow(this: PgHeaderImage, superOnShow: () => void) {
	superOnShow();
}

function onLoad(this: PgHeaderImage, superOnLoad: () => void) {
    superOnLoad();
    this.initButtonClicks();
}
