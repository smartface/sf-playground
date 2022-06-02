import PgMultimediaDesign from 'generated/pages/pgMultimedia';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import Multimedia from '@smartface/native/device/multimedia';
import { CameraDevice } from '@smartface/native/device/multimedia/multimedia';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';

export default class PgMultimedia extends withDismissAndBackButton(PgMultimediaDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initHasCamera() {
    this.btnHasCamera.on('press', () => alert(String(Multimedia.hasCameraFeature)));
  }

  initTakePhoto() {
    this.btnTakePhoto.on('press', () => {
      Multimedia.capturePhoto({
        onSuccess: ({ image }) => {
          console.info('image taken, size: ', image.toBlob().size);
          this.imgv.image = image;
        },
        onFailure: (e) => console.error(e),
        page: this,
        android: {
          cropShape: Multimedia.Android.CropShape.RECTANGLE,
          fixOrientation: true,
          maxImageSize: 2048
        },
        allowsEditing: true,
        action: Multimedia.ActionType.IMAGE_CAPTURE,
        type: Multimedia.Type.IMAGE,
        ios: {
          cameraDevice: Multimedia.iOS.CameraDevice.REAR
        }
      });
    });
  }

  initRecordVideo() {
    this.btnRecordVideo.on('press', () =>
      Multimedia.recordVideo({
        page: this,
        ios: { cameraDevice: CameraDevice.REAR },
        maximumDuration: 2,
        onCancel: () => console.info('cancelled'),
        onFailure: (error) => console.error(error),
        onSuccess: (params) => console.info(params)
      })
    );
  }

  initConvertToMp4() {
    this.btnConvertToMp4.on('press', () =>
      Multimedia.convertToMp4({
        videoFile: new File({ path: Path.AssetsUriScheme + 'file_example_WEBM_480_900KB.webm' }),
        onCompleted: (params) => console.info(params),
        onFailure: () => console.error('failed to convert'),
        outputFileName: 'test'
      })
    );
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initHasCamera();
    this.initRecordVideo();
    this.initConvertToMp4();
    this.initTakePhoto();
  }
}
