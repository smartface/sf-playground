import PgShareDesign from 'generated/pages/pgShare';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
import Contacts from '@smartface/native/device/contacts';
import Share from '@smartface/native/global/share';
import Image from '@smartface/native/ui/image';

export default class PgShare extends withDismissAndBackButton(PgShareDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShare.on('press', () => this.share());
    this.btnShareContacts.on('press', () => this.shareContact());
    this.btnShareFile.on('press', () => this.shareFile());
    this.btnShareImage.on('press', () => this.shareImage());
    this.btnShareText.on('press', () => this.shareText());
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
    Share.shareImage(Image.createFromFile(Path.ImagesUriScheme + 'smartface.png'), this, []);
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
