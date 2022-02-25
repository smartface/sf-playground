import PgGlideDesign from "generated/pages/pgGlide";
import Button from "@smartface/native/ui/button";
import ImageView from "@smartface/native/ui/imageview";
import Dialog from "@smartface/native/ui/dialog";
import ActivityIndicator from "@smartface/native/ui/activityindicator";
import FlexLayout from "@smartface/native/ui/flexlayout";
// import { getCombinedStyle } from "@smartface/extension-utils/lib/getCombinedStyle";
import Screen from "@smartface/native/device/screen";

enum CacheTypes {
  "Memory Caching",
  "HTTP Caching",
  "Disk Caching",
}
const imageOptions = {
  count: 150,
  size: {
    width: 2800,
    height: 2000,
  },
};

// const { paddingLeft, paddingRight } = getCombinedStyle(".sf-page");
// const IMAGE_WIDTH = Screen.width - (paddingLeft + paddingRight);

export default class PgGlide extends PgGlideDesign {
  dialog: Dialog;
  activityIndicator: ActivityIndicator;
  constructor() {
    super();
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  }
  initButtons() {
    let i = 1;
    const items = Object.values(CacheTypes).filter((value) => typeof value === "string") as string[];
    for (let item of items) {
      const button = new Button();
      // @ts-ignore
      this.flOptions.addChild(button, `button${i}`, ".sf-button");
      button.text = item;
      button.on(Button.Events.Press, () => {
        this.initImages(
          item === String(CacheTypes["Disk Caching"]) ? CacheTypes["Disk Caching"] : item === String(CacheTypes["HTTP Caching"]) ? CacheTypes["HTTP Caching"] : CacheTypes["Memory Caching"]
        );
      });
      i++;
    }
    this.flOptions.applyLayout();
  }
  initImages(type: CacheTypes) {
    this.dialog.show();
    this.svMain.layout.removeAll();

    for (let i = 1; i <= imageOptions.count; i++) {
      const imageView = new ImageView({
        // width: Math.round(IMAGE_WIDTH),
        // height: Math.round(IMAGE_WIDTH / (imageOptions.size.width / imageOptions.size.height)),
      });
      // @ts-ignore
      this.svMain.layout.addChild(imageView, `image${i}`, ".sf-imageView #pgGlide-image");
      imageView.loadFromUrl({
        url: this.getImageEndpoint(i),
        useHTTPCacheControl: type === CacheTypes["HTTP Caching"],
        android: {
          useMemoryCache: type === CacheTypes["Memory Caching"],
          useDiskCache: type === CacheTypes["Disk Caching"],
        },
      });
    }
    this.layout.applyLayout();
    setTimeout(() => this.dialog.hide(), 500);
  }
  initDialog() {
    this.dialog = new Dialog({
      android: {
        themeStyle: Dialog.Android.Style.ThemeNoHeaderBar, // Show StatusBar
      },
    });
    this.dialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
    this.dialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

    this.activityIndicator = new ActivityIndicator();
    this.dialog.layout.addChild(this.activityIndicator);
    this.dialog.layout.applyLayout();
  }
  getImageEndpoint(index: number) {
    return `https://picsum.photos/id/${index}/${imageOptions.size.width}/${imageOptions.size.height}`;
  }
}

function onShow(this: PgGlide, superOnShow: () => void) {
  superOnShow();
}

function onLoad(this: PgGlide, superOnLoad: () => void) {
  superOnLoad();
  this.initButtons();
  this.initDialog();
}
