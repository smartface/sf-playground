import TransitionPage1Design from 'generated/pages/transitionPage1';
import Application from 'sf-core/application';
import ImageView from 'sf-core/ui/imageview';

// You should create new Page from UI-Editor and extend with it.
export default class TransitionPage1 extends TransitionPage1Design {
    myImageView2: ImageView;
    myImageView3: ImageView;
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initImages() {
        this.myImageView2 = new ImageView({
            image: "images://smartface.png", // saturn
            onTouch: () => this.router.push('transition/3')
        });

        this.myImageView3 = new ImageView({
            image: "images://smartface.png", // rickship
            onTouch: () => this.router.push('transition/2')
        });

        //@ts-ignore
        this.myImageView3.transitionId = "rick";
        //@ts-ignore
        this.myImageView2.transitionId = "saturn";
        //@ts-ignore
        this.transitionViews = [this.myImageView2, this.myImageView3];

        //@ts-ignore
        this.layout.addChild(this.myImageView2, "myImageView2", ".sf-imageView", {
            width: 200,
            height: 200,
            imageFillType: "STRETCH"
        });

        //@ts-ignore
        this.layout.addChild(this.myImageView3, "myImageView3", ".sf-imageView", {
            width: 200,
            height: 200,
            imageFillType: "STRETCH"
        });

        this.dispatch({
            type: "updateUserStyle",
            userStyle: {
                flexProps: {
                    flexDirection: "COLUMN",
                    justifyContent: "CENTER",
                    alignItems: "CENTER"
                }
            }
        });
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
    Application.statusBar.visible = false;
    this.headerBar.visible = false;
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initImages();
} 