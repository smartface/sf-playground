import PgTimerDesign from 'generated/pages/pgTimer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import Timer from '@smartface/native/global/timer';

export default class PgTimer extends withDismissAndBackButton(PgTimerDesign) {
  intervalID: number;
  timeoutID: number;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnCreateInterval.on('press', () => this.createInterval());
    this.btnCreateTimeout.on('press', () => this.callWithTimeout());
    this.btnClearAllTimers.on('press', () => this.clearAllTimers());
  }

  clearAllTimers() {
    Timer.clearAllTimer();
  }

  callWithTimeout() {
    this.timeoutID = Timer.setTimeout({
      task: () => {
        console.info('timeout');
        alert('timeout');
      },
      delay: 2000
    });
  }

  createInterval() {
    this.intervalID = Timer.setInterval({
      task: () => {
        alert('interval');
        console.info('interval');
      },
      delay: 2000
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
