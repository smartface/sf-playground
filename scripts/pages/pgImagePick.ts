import Multimedia from "@smartface/native/device/multimedia";
import PgImagePickDesign from "generated/pages/pgImagePick";
import GridView from "@smartface/native/ui/gridview";
import GridViewItem from "@smartface/native/ui/gridviewitem";
import LayoutManager from "@smartface/native/ui/layoutmanager";
import System from "@smartface/native/device/system";
import Color from "@smartface/native/ui/color";
import DecelerationRate from "@smartface/native/ui/ios/decelerationrate";
import ImageView from "@smartface/native/ui/imageview";
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import Image from "@smartface/native/ui/image";
import PgImageCrop from "./pgImageCrop";
import SwipeView from "@smartface/native/ui/swipeview";

const SPAN_COUNT: number = 1;
const ITEM_WIDTH: number = 150;

export default class PgImagePick extends PgImagePickDesign {
  myGridView: GridView;
  layoutManager: LayoutManager;
  imageDataset: Image[];
  swipeView: SwipeView;
  imagePages: any = [];
  index = 0;
  router: any;
  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
  superOnShow();
  Multimedia.pickMultipleFromGallery({
    type: Multimedia.Type.IMAGE,
    page: this,
    onSuccess: ({ assets }) => {
      this.imageDataset = assets.map((asset) => asset.image);
      this.myGridView = new GridView({
        layoutManager: this.layoutManager,
        refreshEnabled: false,
        itemCount: this.imageDataset.length,
        scrollBarEnabled: false,
        onItemCreate: () => {
          var gridViewItem = new GridViewItem();
          var myImageView = new ImageView({ flexGrow: 1 });
          gridViewItem.addChild(myImageView);
          this.myGridView.dispatch(addChild(`gridViewItem${++this.index}`, gridViewItem));
          //@ts-ignore
          gridViewItem.myImageView = myImageView;
          return gridViewItem;
        },
        onItemBind: (gridViewItem, index) => {
          const length = this.imageDataset.length;
          const image = this.imageDataset[index];
          gridViewItem.myImageView.image = image;
          gridViewItem.applyLayout();
        },
        onItemSelected: (gridViewItem, index) => {
          this.swipeView.swipeToIndex(index);
        },
        onScroll: (contentOffset) => {},
      });

      this.flImagePageLayout.removeAll();
      this.swipeView = new SwipeView({
        page: this,
        flexGrow: 1,
        pages: this.imageDataset.map((image: Image) =>
          PgImageCrop({
            image,
            parent: this,
          })
        ),
        onPageSelected: (index: number) => {
          this.index = index;
        },
      });
      this.flImagePageLayout.addChild(this.swipeView, "swipeView", ".grow-relative");
      if (System.OS === System.OSType.IOS) {
        this.flImagePageLayout.applyLayout();
      }
      this.myGridView.ios.decelerationRate = DecelerationRate.FAST;

      if (System.OS === "Android") this.myGridView.android.snapToAlignment = GridView.Android.SnapAlignment.SNAPTO_START;

      this.layoutManager.contentInset = { top: 0, left: 0, bottom: 0, right: 20 };

      this.flGridView.addChild(this.myGridView, "myGridView", ".sf-gridView", (userProps) => {
        userProps.backgroundColor = Color.TRANSPARENT;
        userProps["flexProps"] = {
          flexGrow: 1,
          positionType: "RELATIVE",
        };
        return userProps;
      });
      this.imgCrop.onTouch = () => {
        Multimedia.launchCropper({
          page: this,
          asset: this.imagePages[this.index].image,
          onSuccess: ({ image }) => {
            const page = this.imagePages[this.index];
            page.setImage(image);
          },
        });
      };
    },
  });
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
  superOnLoad();
  this.layoutManager = new LayoutManager({
    spanCount: SPAN_COUNT,
    scrollDirection: LayoutManager.ScrollDirection.HORIZONTAL,
    onItemLength: function () {
      // Make sure GridViewItem's are square sized
      return ITEM_WIDTH;
    },
  });

  this.layoutManager.ios.targetContentOffset = (proposedContentOffset, velocity) => {
    let positionX = this.gridView.contentOffset.x / ITEM_WIDTH;
    let decimalPositionX = positionX;
    let precisionPositionX = positionX % 1;

    if (velocity.x == 0 && precisionPositionX >= 0.5) {
      decimalPositionX = decimalPositionX + 1;
    } else if (velocity.x > 0) {
      decimalPositionX = decimalPositionX + 1;
    }

    return { x: decimalPositionX * ITEM_WIDTH, y: 0 };
  };
  this.imgClose.onTouch = () => this.router.goBack();
}
