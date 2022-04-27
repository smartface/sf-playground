import PgAlertViewDesign from 'generated/pages/pgAlertView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import AlertView from '@smartface/native/ui/alertview';
import { ButtonType } from '@smartface/native/ui/alertview/alertview';

export default class PgAlertView extends withDismissAndBackButton(PgAlertViewDesign) {
  alertView: AlertView;

  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShow.on('press', this.alertView.show);
    this.btnIsShowing.on('press', () => {
      console.log('currently: ' + this.alertView.isShowing);
      setTimeout(() => console.log('timeout: ' + this.alertView.isShowing), 2500);
    });
    this.sw.onToggleChanged = (toggle) => (this.alertView.android.cancellable = toggle);
  }

  initAlertView() {
    this.alertView = new AlertView({
      title: 'SF Title',
      message: 'SF Message'
    });
    this.alertView.addTextBox({ text: '', hint: 'example textbox', isPassword: false, android: {} });
    this.alertView.onDismiss = () => console.log('dismissed');
    this.alertView.addButton({ type: ButtonType.NEUTRAL, text: 'close', onClick: () => this.alertView.dismiss() });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initAlertView();
  }

  onLoad() {
    super.onLoad();
  }
}
