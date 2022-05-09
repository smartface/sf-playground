import PgEmailComposerDesign from 'generated/pages/pgEmailComposer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import EmailComposer from '@smartface/native/ui/emailcomposer';
import File from '@smartface/native/io/file';
import System from '@smartface/native/device/system';
import FileStream from '@smartface/native/io/filestream';
import Image from '@smartface/native/ui/image';
import Path from '@smartface/native/io/path';

export default class PgEmailComposer extends withDismissAndBackButton(PgEmailComposerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.btnCompose.on('press', () => this.composeEmail());
  }

  composeEmail() {
    try {
      if (EmailComposer.canSendMail()) {
        const emailcomposer = new EmailComposer();
        emailcomposer.setBCC(['bcc@smartface.io', 'bcc2@smartface.io']);
        emailcomposer.setCC(['cc@smartface.io', 'cc2@smartface.io']);
        emailcomposer.setTO(['to@smartface.io', 'to2@smartface.io']);
        emailcomposer.setMessage('message');
        emailcomposer.setSubject('subject');
        emailcomposer.onClose = function () {
          console.log('onClose');
        };

        const imageFile = new File({ path: Path.AssetsUriScheme + 'smartface.png' });
        const image = new Image({ path: Path.AssetsUriScheme + 'smartface.png' });

        if (System.OS == 'iOS') {
          emailcomposer.ios.addAttachmentForiOS(image.toBlob() as any, 'image/png', 'smartface.png');
        } else {
          emailcomposer.android.addAttachmentForAndroid(imageFile);
        }

        emailcomposer.show(this);
      } else {
        throw new Error('Cant send mail');
      }
    } catch (error) {
      console.error(error);
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
