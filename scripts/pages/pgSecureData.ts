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
    this.btnSave.on('press', () => this.saveToSecureData());
    this.btnLoad.on('press', () => this.readFromSecureData());
    this.btnDelete.on('press', () => this.deleteSecureData());
  }

  deleteSecureData() {
    this.mySecureData
      .delete()
      .then(() => (this.lbl.text = 'DELETED'))
      .catch((error) => console.error(error.message, { stack: error.stack }));
  }

  readFromSecureData() {
    this.mySecureData
      .read()
      .then((value) => {
        this.lbl.text = 'READ: ' + value;
      })
      .catch((error) => {
        if (!error) {
          this.lbl.text = 'NOT_FOUND';
        }
      });
  }

  saveToSecureData() {
    this.mySecureData.save({ value: this.tv.text }).then(() => (this.lbl.text = 'SAVED'));
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
