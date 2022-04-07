import PgFileUploadDesign from "generated/pages/pgFileUpload";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import System from "@smartface/native/device/system";
import File from "@smartface/native/io/file";
import Multimedia from "@smartface/native/device/multimedia";
import Image from "@smartface/native/ui/image";
import DocumentPicker from "@smartface/native/device/documentpicker";
import FileStream from "@smartface/native/io/filestream";
import Blob from "@smartface/native/global/blob";
import View from "@smartface/native/ui/view";
import Network from "@smartface/native/device/network";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";

export default class PgFileUpload extends withDismissAndBackButton(PgFileUploadDesign) {
  protected uploadMenu = new Menu();
  protected currentBase64 = "";
  protected isUploading = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  setVisible(view: StyleContextComponentWithDispatch<View>, visible: boolean) {
    view.dispatch({
      type: "updateUserStyle",
      userStyle: {
        visible,
      },
    });
  }

  initUploadIndicator() {
    this.setVisible(this.aiUploadIndicator, false);
  }

  selectFileAction(file: Image | File) {
    if (file instanceof File) {
      // If your video is supposed to be really big like >100 MiB, consider dividing them into chunks.
      const fileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
      if (fileStream.isReadable) {
        this.lblFileSelectorName.text = file.name;
        this.btnUpload.enabled = true;
        const fileBlob = fileStream.readToEnd();
        if (fileBlob instanceof Blob) {
          // If the process is taking too much time, use async
          this.currentBase64 = fileBlob.toBase64();
        } else {
          // Failed to read
          this.currentBase64 = "";
        }
      }
    } else if (file instanceof Image) {
      this.lblFileSelectorName.text = "image.png";
      this.btnUpload.enabled = true;
      const imageBlob = file.toBlob();
      this.currentBase64 = imageBlob.toBase64();
    }
  }

  initMenu() {
    this.uploadMenu.headerTitle = "Select a method to upload";
    const menuItemCamera = new MenuItem({ title: "Take a Photo" });
    const menuItemGallery = new MenuItem({ title: "Pick an Image From Gallery" });
    const menuItemDocument = new MenuItem({ title: "Pick a File" });
    const menuItemCancel = new MenuItem({ title: "Cancel" });
    menuItemCancel.ios.style = MenuItem.Styles.CANCEL;
    menuItemCamera.on('selected', () => {
      /**
       * Don't forget to grant relevant permissions before calling this on your published app.
       * Smartface Emulator will have these permissions.
       */
      Multimedia.capturePhoto({
        onSuccess: ({ image }) => this.selectFileAction(image),
        page: this,
      });
    });
    menuItemGallery.on('selected', () => {
      Multimedia.pickFromGallery({
        type: Multimedia.Type.IMAGE,
        onSuccess: ({ image }) => this.selectFileAction(image),
        page: this,
      });
    });
    menuItemDocument.on('selected', () => {
      DocumentPicker.pick({
        type: [DocumentPicker.Types.ALLFILES],
        onSuccess: (file) => this.selectFileAction(file),
        onCancel: () => {},
        onFailure: () => {},
        page: this,
      });
    });
    const menuItems = [menuItemGallery, menuItemCamera, menuItemDocument];
    System.OS === System.OSType.IOS && menuItems.push(menuItemCancel); // Android doesn't need this
    this.uploadMenu.items = menuItems;
    this.flFileSelector.onTouchEnded = () => this.uploadMenu.show(this);
  }

  initButton() {
    this.btnUpload.onPress = async () => {
      if (this.isUploading === true) {
        return; // Already uploading, don't do anything
      }
      await this.uploadFile(this.currentBase64);
    };
  }

  async uploadFile(fileBas64: string) {
    if (Network.connectionType === Network.ConnectionType.NONE) {
      return; // No internet
    } else if (Network.connectionType === Network.ConnectionType.MOBILE) {
      // Warn the user about the cellular situation
      alert("You are on cellular connection, continue to upload? Charges may apply.");
    }
    if (this.isUploading === true) {
      return; // Already uploading, don't do anything
    }
    this.toggleUpload(true);
    /**
     * Mocking the service call
     */
    setTimeout(() => {
      // Use the converted base64 to upload your file
      console.info(fileBas64);
      console.info("File size: ", this.getFileSizeInMebiBytes(fileBas64));
      this.toggleUpload(false);
    }, 2000);
  }

  toggleUpload(uploading: boolean) {
    this.isUploading = uploading;
    this.btnUpload.enabled = !uploading;
    this.setVisible(this.aiUploadIndicator, uploading);
    this.lblUploadIndicator.text = uploading ? "Uploading..." : "Upload Complete.";
  }

  /**
   * More info at: https://en.wikipedia.org/wiki/Base64#Output_Padding
   */
  getFileSizeInMebiBytes(base64: string): number {
    return base64.length * (3 / 4) * 1024 * 1024;
  }

  onShow() {
    super.onShow();
    this.headerBar.title = "File Upload";
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initMenu();
    this.initButton();
    this.initUploadIndicator();
  }
}
