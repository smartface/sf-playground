import PgSecureDataDesign from 'generated/pages/pgSecureData';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import SecureData from '@smartface/native/global/securedata';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';

export default class PgSecureData extends withDismissAndBackButton(PgSecureDataDesign) {
  mySecureData: SecureData;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.mySecureData = new SecureData({
      ios: {
        service: 'io.smartface.SmartfaceEnterpriseApp'
      },
      key: 'keyparamater'
    });
    this.btnSave.on(ButtonEvents.Press, this.saveToSecureData);
    this.btnLoad.on(ButtonEvents.Press, this.readFromSecureData);
    this.btnDelete.on(ButtonEvents.Press, this.deleteSecureData);
  }

  deleteSecureData() {
    this.mySecureData.delete();
  }

  readFromSecureData() {
    this.mySecureData.read().then((value) => {
      this.lbl.text = 'READ: ' + value;
    });
  }

  saveToSecureData() {
    this.mySecureData.save({ value: this.tv.text });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
