import PgTextAreaDesign from 'generated/pages/TextArea';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgTextArea extends withDismissAndBackButton(PgTextAreaDesign) {
  private _bounces = true;
  private _showScrollBar = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnBounces.on('press', () => this.changeBounces());
    this.btnShowScrollBar.on('press', () => this.changeScrollBar());
  }

  changeBounces() {
    this.ta.ios.bounces = !this._bounces;
    this._bounces = !this._bounces;
    this.btnBounces.text = this._bounces ? 'Set Bounces False (iOS)' : 'Set Bounces True (iOS)';
    this.ta.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas orci congue porttitor pulvinar. Donec fermentum convallis arcu id dictum. Donec volutpat odio eu volutpat semper. Etiam dignissim dui lectus, aliquam ultrices orci gravida nec. Donec finibus, enim in maximus faucibus, neque ipsum blandit nulla, quis molestie eros turpis ac ipsum. Pellentesque sapien erat, facilisis nec accumsan at, dictum ut nisi. Vivamus tincidunt bibendum tellus non malesuada. Nullam hendrerit turpis leo, ut venenatis eros lacinia ultrices. Etiam est ante, interdum id ligula sed, ultrices egestas ipsum. Ut at aliquet massa, tempus eleifend ipsum. Duis eu dolor a lacus bibendum rutrum non ac lectus. Aliquam tincidunt sollicitudin odio quis semper.';
  }

  changeScrollBar() {
    this.ta.ios.showScrollBar = !this._showScrollBar;
    this._showScrollBar = !this._showScrollBar;
    this.btnShowScrollBar.text = this._showScrollBar ? 'Hide ScrollBar (iOS)' : 'Show ScrollBar (iOS)';
    this.ta.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas orci congue porttitor pulvinar. Donec fermentum convallis arcu id dictum. Donec volutpat odio eu volutpat semper. Etiam dignissim dui lectus, aliquam ultrices orci gravida nec. Donec finibus, enim in maximus faucibus, neque ipsum blandit nulla, quis molestie eros turpis ac ipsum. Pellentesque sapien erat, facilisis nec accumsan at, dictum ut nisi. Vivamus tincidunt bibendum tellus non malesuada. Nullam hendrerit turpis leo, ut venenatis eros lacinia ultrices. Etiam est ante, interdum id ligula sed, ultrices egestas ipsum. Ut at aliquet massa, tempus eleifend ipsum. Duis eu dolor a lacus bibendum rutrum non ac lectus. Aliquam tincidunt sollicitudin odio quis semper.';
  }

  initTextArea() {
    this.ta.android.hint = 'Fill Text Area';
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
