import PgGridViewDesign from 'generated/pages/pgGridView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgGridView extends withDismissAndBackButton(PgGridViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initLabels() {
    this.flFullSpan.lblTitle.text = 'Gridview FullSpan';
    this.flHorizontalCard.lblTitle.text = 'Gridview Horizontal Cards';
    this.flRowRange.lblTitle.text = 'Gridview Row Range Methods';
    this.flPagination.lblTitle.text = 'Lazy Loading (Pagination)';
  }

  initPressEvents() {
    this.flFullSpan.on('touch', () => this.router.push('PgGridViewFullSpan'));
    this.flHorizontalCard.on('touch', () => this.router.push('PgGridViewHorizontalCard'));
    this.flRowRange.on('touch', () => this.router.push('PgGridViewRowRange'));
    this.flPagination.on('touch', () => this.router.push('PgGridViewPagination'));
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
    this.initLabels();
    this.initPressEvents();
  }
}
