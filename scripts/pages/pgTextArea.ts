import PgTextAreaDesign from 'generated/pages/pgTextArea';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgTextArea extends withDismissAndBackButton(PgTextAreaDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initTextArea() {
    this.ta.hint = 'Fill Text Area';
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initTextArea();
  }

  onLoad() {
    super.onLoad();
  }
}
