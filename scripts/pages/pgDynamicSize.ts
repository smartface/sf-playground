import PgDynamicSizeDesign from 'generated/pages/pgDynamicSize';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, Router } from '@smartface/router';

export default class PgDynamicSize extends withDismissAndBackButton(PgDynamicSizeDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   * @param {Object} parameters passed from Router.go function
   */
  onShow() {
    super.onShow();
    const newText =
      'Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines';
    setTimeout(() => {
      this.flDynamicSize.setText(newText, this);
    }, 2500);
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
