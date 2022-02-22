import Image from '@smartface/native/ui/image';
import PgPhotoViewerDesign from 'generated/pages/pgPhotoViewer';

export default function PgPhotoViewer(props: { image: Image }) {
    return class extends PgPhotoViewerDesign {
        initialized = false;
        constructor() {
            super();
            this.headerBar.title = ' ';
        }
        setImage(image: Image) {
            this.img.image = image;
        }
        onShow() {
            super.onShow?.();
            if (!this.initialized) {
                setTimeout(() => {
                    this.setImage(props.image);
                    this.initialized = true;
                }, 500);
            }
        }
        onLoad() {
            super.onLoad?.();
        }
    }
}
