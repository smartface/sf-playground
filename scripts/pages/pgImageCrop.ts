import Multimedia from "@smartface/native/device/multimedia";
import Button from "@smartface/native/ui/button";
import Color from "@smartface/native/ui/color";
import FlexLayout from "@smartface/native/ui/flexlayout";
import Image from "@smartface/native/ui/image";
import ImageView from "@smartface/native/ui/imageview";
import PgImageCropDesign from "generated/pages/pgImageCrop";
import PgImagePick from "./pgImagePick";

type SwipeViewAdvertImageFullProps = {
  image: any;
  parent: PgImagePick;
};

export default function PgImageCrop(props: SwipeViewAdvertImageFullProps) {
  return class extends PgImageCropDesign {
    image: any;
    constructor() {
      super();
      this.onShow = onShow.bind(this, this.onShow.bind(this));
      this.onLoad = onLoad.bind(this, this.onLoad.bind(this), props);
    }
    bind() {
      props.parent.imagePages.push(this);
    }
    setImage(image: Image) {
      this.imgScreen.image = image;
    }
  };
}

function onShow(this: InstanceType<ReturnType<typeof PgImageCrop>>, superOnShow: () => void) {
  superOnShow();
}

async function onLoad(this: InstanceType<ReturnType<typeof PgImageCrop>>, superOnLoad: () => void, props: SwipeViewAdvertImageFullProps) {
  superOnLoad();
  const { image } = props;
  this.bind();
  this.image = image;
  this.imgScreen.image = image;
}
