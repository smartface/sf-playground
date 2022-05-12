import PgSoundDesign from 'generated/pages/Sound';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import Sound from '@smartface/native/device/sound';

export default class PgSound extends withDismissAndBackButton(PgSoundDesign) {
  mySound: Sound;
  myButton: Button;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  // The page design has been made from the code for better
  // showcase purposes. As a best practice, remove this and
  // use WYSIWYG editor to style your pages.
  centerizeTheChildrenLayout() {
    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          flexDirection: 'COLUMN',
          justifyContent: 'CENTER',
          alignItems: 'CENTER'
        }
      }
    });
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.centerizeTheChildrenLayout();

    this.mySound = new Sound();
    this.mySound.isLooping = true;

    this.myButton = new Button({
      text: 'Load URL',
      onPress: () => {
        this.mySound.onReady = () => {
          this.mySound.play();
          console.log('isPlaying: ', this.mySound.isPlaying);
          console.log('volume: ', this.mySound.volume);
          console.log('totalDuration: ', this.mySound.totalDuration);
          console.log('currentDuration: ', this.mySound.currentDuration);
        };
        this.mySound.loadURL('https://www.rmp-streaming.com/media/bbb-360p.mp4');
      }
    });

    this.addChild(this.myButton, 'myButton', '.sf-button', {
      top: 100,
      width: 100,
      height: 80,
      backgroundColor: '#FFFF00'
    });
  }
}
