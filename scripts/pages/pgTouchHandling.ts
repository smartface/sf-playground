import PgTouchHandlingDesign from 'generated/pages/pgTouchHandling';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgTouchHandling extends withDismissAndBackButton(PgTouchHandlingDesign) {
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
    this.flexLayout1.onTouchEnded = () => {
      console.info('flexLayout1: ontouchended callback');
      alert('flexLayout1: ontouchended callback');
    }
    this.flexLayout1.on('touchEnded', () => {
      console.info('flexLayout1: ontouchended emitter');
      alert('flexLayout1: ontouchended emitter')
    })
  }
}
