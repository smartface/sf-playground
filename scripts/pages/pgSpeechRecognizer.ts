import PgSpeechRecognizerDesign from 'generated/pages/pgSpeechRecognizer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import TextArea from '@smartface/native/ui/textarea';
import SpeechRecognizer from '@smartface/native/global/speechrecognizer';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import { styleableComponentMixin } from "@smartface/styling-context";

class StyleableButton extends styleableComponentMixin(Button) {}
class StyleableTextArea extends styleableComponentMixin(TextArea) {}

export default class PgSpeechRecognizer extends withDismissAndBackButton(PgSpeechRecognizerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    const myButton = new StyleableButton({
                 height: 200,
                 text: "Start Recording"
              })
             const myTextArea = new StyleableTextArea({
                 height: 100
              })
             myButton.onPress = function() {
                 if (!SpeechRecognizer.isRunning()) {
                     myButton.text = "Stop Recording";
                     if (System.OS === "iOS") {
                         startSpeechRecognizer();
                     }
                     else if (System.OS === "Android") {
                         const RECORD_AUDIO_CODE = 1002;
                         Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.Android.Permissions.RECORD_AUDIO);
                         Application.android.onRequestPermissionsResult = function(e) {
                             if (e.requestCode === RECORD_AUDIO_CODE && e.result) {
                                 startSpeechRecognizer();
                             }
                         }
                     }
                 }
                 else {
                     myButton.text = "Start Recording";
                     SpeechRecognizer.stop();
                 }
                }
             this.addChild(myTextArea, "uniqueTextArea");
             this.addChild(myButton, "uniqueButton")
             function startSpeechRecognizer() {
                 SpeechRecognizer.start({
                     locale : "en_US",
                     onResult: function(result) {
                         myTextArea.text = result;
                     },
                     onFinish: function(result) {
                         myButton.text = "Start Recording";
                         alert("Finish : " + result);
                     },
                     onError: function(error) {
                         myButton.text = "Start Recording";
                         alert("Error : " + error);
                     }
                 });
    }
  }
}
