import PgBlobDesign from 'generated/pages/Blob';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Blob from '@smartface/native/global/blob';

export default class PgBlob extends withDismissAndBackButton(PgBlobDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  tester() {
    const smartfaceBlob = Blob.createFromUTF8String('Smartface');
    console.info('Smartface string into blob into base64: ' + smartfaceBlob.toBase64());
    console.info('Smartface string into blob into string: ' + smartfaceBlob.toString());
    console.info('Smartface Blob Size: ' + smartfaceBlob.size);
    console.info('Smartface Blob sliced [0-4] into string: ' + smartfaceBlob.slice(0, 4).toString());
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.tester();
  }

  onLoad() {
    super.onLoad();
  }
}
