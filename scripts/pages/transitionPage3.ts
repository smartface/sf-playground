import TransitionPage33Design from 'generated/pages/transitionPage3';
import FlexLayout = require('sf-core/ui/flexlayout');
import ImageView = require('sf-core/ui/imageview');

// You should create new Page from UI-Editor and extend with it.
export default class TransitionPage3 extends TransitionPage33Design {
    myImageView2: ImageView;
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initImages() {
        this.myImageView2 = new ImageView({
            image: "images://smartface.png", // saturn
            onTouch: (): any => this.router.goBack()
        });
        //@ts-ignore
        this.transitionViews = [this.myImageView2];
        //@ts-ignore
        this.myImageView2.transitionId = "saturn";
        //@ts-ignore
        this.layout.addChild(this.myImageView2, "myImageView2", ".sf-imageView", {
            width: null,
            height: null,
            flexGrow: 1
        });

        this.dispatch({
            type: "updateUserStyle",
            userStyle: {
                flexProps: {
                    flexDirection: "ROW",
                    justifyContent: "CENTER",
                    alignItems: "CENTER"
                }
            }
        });
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initImages();
}