import PgButtonDesign from 'generated/pages/pgButton';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgButton extends withDismissAndBackButton(PgButtonDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.btn1.on('press', () => {
      console.log('btn1 press event test');
    });
    this.btn2.on('longPress', () => {
      console.log('btn2 longPress event test');
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
