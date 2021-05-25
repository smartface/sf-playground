import TransitionPage2Design from 'generated/pages/transitionPage2';
import FlexLayout from 'sf-core/ui/flexlayout';
import Application from 'sf-core/application';
import ImageView from 'sf-core/ui/imageview';

// You should create new Page from UI-Editor and extend with it.
export default class TransitionPage2 extends TransitionPage2Design {
    myImageView2: ImageView;
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initImages() {
        this.myImageView2 = new ImageView({
            image: "images://smartface.png", // rickship
            onTouch: (): any => this.router.goBack()
        });
        //@ts-ignore
        this.transitionViews = [this.myImageView2];
        //@ts-ignore
        this.myImageView2.transitionId = "rick";

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
    Application.statusBar.visible = false;
    this.headerBar.visible = false;
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initImages();
}