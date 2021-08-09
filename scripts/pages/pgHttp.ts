import PageSampleDesign from 'generated/pages/pgHttp';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Application from '@smartface/native/application';
import ImageView from '@smartface/native/ui/imageview';
import Http from "@smartface/native/net/http";
import Image from '@smartface/native/ui/image';

//You should create new Page from UI-Editor and extend with it.
export default class Sample extends PageSampleDesign {
    myImageView: ImageView;
    myHttp = new Http();
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }

    requestImage(): void {
        this.myHttp.requestImage({
            url: 'https://httpbin.org/image/png',
            onLoad: (e: {
                statusCode: number;
                headers: { [key: string]: string };
                image: Image;
            }): void => {
                // Image loaded.
                this.myImageView.image = e.image;
            },
            onError: (e: {
                message: string;
                body: any;
                statusCode: number;
                headers: { [key: string]: string };
            }): void => {
                // Http request image failed.
                alert(e.message);
            }
        });

        this.myImageView = new ImageView();
        //@ts-ignore
        this.layout.addChild(this.myImageView, "myImageView", ".sf-imageView", {
            width: 100,
            height: 100,
            flexProps: {
                alignSelf: "CENTER",
            },
            imageFillType: ImageView.FillType.STRETCH
        });
    }
}
function onShow(this: Sample, superOnShow: () => void) {
    const { headerBar } = this;
    superOnShow();
    Application.statusBar.visible = false;
    headerBar.visible = false;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: Sample, superOnLoad: () => void) {
    superOnLoad();
    this.requestImage();
}