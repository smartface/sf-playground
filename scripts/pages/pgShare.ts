import PgShareDesign from 'generated/pages/pgShare';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
import Contacts from '@smartface/native/device/contacts';
import Share from '@smartface/native/global/share';
import Image from '@smartface/native/ui/image';

export default class PgShare extends withDismissAndBackButton(PgShareDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShare.on(ButtonEvents.Press, this.share);
    this.btnShareContacts.on(ButtonEvents.Press, this.shareContact);
    this.btnShareFile.on(ButtonEvents.Press, this.shareFile);
    this.btnShareImage.on(ButtonEvents.Press, this.shareImage);
    this.btnShareText.on(ButtonEvents.Press, this.share);
  }

  share() {
    Share.share({
      page: this,
      items: [new File({ path: Path.AssetsUriScheme + 'file_example_WEBM_480_900KB.webm' })],
      blacklist: []
    });
  }

  shareContact() {
    Share.shareContacts({
      page: this,
      items: [new Contacts.Contact({ address: 'address', firstName: 'firstName', lastName: 'lastName', phoneNumber: ['00000'] })],
      blacklist: []
    });
  }

  shareFile() {
    Share.shareFile(new File({ path: Path.AssetsUriScheme + 'file_example_WEBM_480_900KB.webm' }), this, []);
  }

  shareImage() {
    Share.shareImage(new Image({ path: Path.AssetsUriScheme + 'icon.png' }), this, []);
  }

  shareText() {
    Share.shareText('Smartface', this, []);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
