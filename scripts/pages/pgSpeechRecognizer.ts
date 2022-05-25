import PgSpeechRecognizerDesign from 'generated/pages/pgSpeechRecognizer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import TextArea from '@smartface/native/ui/textarea';
import SpeechRecognizer from '@smartface/native/global/speechrecognizer';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import { styleableComponentMixin } from '@smartface/styling-context';
import { getPermission } from '@smartface/extension-utils/lib/permission';

export default class PgSpeechRecognizer extends withDismissAndBackButton(PgSpeechRecognizerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnStartStop.on('press', () => {
      console.info('SpeechRecognizer.isRunning(): ', SpeechRecognizer.isRunning());
      if (!SpeechRecognizer.isRunning()) {
        this.btnStartStop.text = 'Stop Recording';
        if (System.OS === System.OSType.IOS) {
          this.startSpeechRecognizer();
        } else {
          getPermission({
            permissionText: 'RECORD_AUDIO_CODE',
            androidPermission: 'RECORD_AUDIO',
            permissionTitle: 'RECORD_AUDIO permission'
          })
            .then(() => {
              this.startSpeechRecognizer();
            })
            .catch((error) => console.error(error.message, { stack: error.stack }));
        }
      } else {
        this.btnStartStop.text = 'Start Recording';
        SpeechRecognizer.stop();
      }
    });
  }

  startSpeechRecognizer() {
    console.log('startSpeechRecognizer');
    SpeechRecognizer.start({
      locale: 'en_US',
      onResult: (result) => {
        console.info('onResult ', result);
        this.lbl.text = result;
      },
      onFinish: (result) => {
        console.info('onFinish ', result);
        this.btnStartStop.text = 'Start Recording';
      },
      onError: (error) => {
        console.info('onError ', error);
        this.btnStartStop.text = 'Start Recording';
      }
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
