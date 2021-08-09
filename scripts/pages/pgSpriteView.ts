import PgSpriteViewDesign from 'generated/pages/pgSpriteView';
import SpriteView from '@smartface/extension-spriteview';
import Image from '@smartface/native/ui/image';
import ImageView from '@smartface/native/ui/imageview';

export default class PgSpriteView extends PgSpriteViewDesign {
    spriteView: SpriteView;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initSpriteView() {
        this.spriteView = new SpriteView({
            width: 100, height: 125,
            imageFillType: ImageView.FillType.ASPECTFIT
        });
        this.spriteView.setSprite({
            sheet: Image.createFromFile("images://braid.png"), // Image for the frame
            frameX: 7, // Distinct image count on X axis
            frameY: 4, // Distinct image count on Y axis
            frameCount: 27, // Frame count of the image
        });
        this.layout.addChild(this.spriteView);
        this.layout.applyLayout();

    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgSpriteView, superOnShow: () => void) {
    superOnShow();
    this.spriteView.play(500);
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgSpriteView, superOnLoad: () => void) {
    superOnLoad();
    this.initSpriteView();
}
