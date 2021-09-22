import PgZoomableImageViewDesign from 'generated/pages/pgZoomableImageView';
import ZoomableImageView from '@smartface/extension-zoomable-imageview';

export default class PgZoomableImageView extends PgZoomableImageViewDesign {
    zoomableImageView: InstanceType<typeof ZoomableImageView>;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initZoomableImageView() {
        this.zoomableImageView = new ZoomableImageView({
            width: 250,
            height: 250
        });
        this.zoomableImageView.image = "images://smartface.png";
        this.zoomableImageView.minimumZoomScale = 1;
        this.zoomableImageView.android.mediumZoomScale = 2;
        this.zoomableImageView.maximumZoomScale = 3;

        this.layout.addChild(this.zoomableImageView);
    }
}

function onShow(this: PgZoomableImageView, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgZoomableImageView, superOnLoad: () => void) {
    superOnLoad();
    this.initZoomableImageView();
}
