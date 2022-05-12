import PgTimerDesign from 'generated/pages/Timer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import { Timer } from '@smartface/native/global';
import { TimerBase } from '@smartface/native/global/timer/timer';

export default class PgTimer extends withDismissAndBackButton(PgTimerDesign) {
  interval: TimerBase;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnCreateInterval.on(ButtonEvents.Press, this.createInterval);
    this.btnCreateTimeout.on(ButtonEvents.Press, this.callWithTimeout);
    this.btnClearAllTimers.on(ButtonEvents.Press, this.clearAllTimers);
  }

  clearAllTimers() {
    Timer.clearAllTimer();
  }

  callWithTimeout() {
    this.interval = Timer.setTimeout({ task: () => console.info('timeout'), delay: 2000 });
  }

  createInterval() {
    this.interval = Timer.setInterval({ task: () => console.info('interval'), delay: 2000 });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
