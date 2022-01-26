import PgDynamicSizeDesign from "generated/pages/pgDynamicSize";
import { withDismissAndBackButton } from "@smartface/mixins";

export default class PgDynamicSize extends withDismissAndBackButton(PgDynamicSizeDesign) {
  constructor() {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   * @param {Object} parameters passed from Router.go function
   */
  public onShow() {
    super.onShow();
    const newText =
      "Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines, Some really long text that will overflow into more lines";
    setTimeout(() => {
      this.flDynamicSize.setText(newText, this);
    }, 1500);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
