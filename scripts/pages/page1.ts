import Page1Design from "generated/pages/page1";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import File from "@smartface/native/io/file";

export default class Page1 extends withDismissAndBackButton(Page1Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    const myFile = new File({
        path: 'assets://test.mp4'
    });
    this.videoView1.loadFile(myFile);
  }

  /**
   * @event onLoad
   */
  onLoad() {
    super.onLoad();
  }
}
