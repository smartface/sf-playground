import PgListViewDesign from 'generated/pages/pgListView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgListView extends withDismissAndBackButton(PgListViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initLabels() {
    this.flMultipleLvi.lblTitle.text = 'Multiple ListviewItem';
    this.flPagination.lblTitle.text = 'Lazy Loading (Pagination)';
    this.flStickyItem.lblTitle.text = 'Listview with Sticky Item';
    this.flSwipeItem.lblTitle.text = 'ListviewItem Swipe';
    this.flDragDrop.lblTitle.text = 'ListviewItem Drag&Drop';
    this.flZebra.lblTitle.text = 'Listview Zebra Design';
    this.flExtendShrink.lblTitle.text = 'Listview Extend Shrink Item';
    this.flDynamicLine.lblTitle.text = 'Listview Dynamic Height';
  }

  initPressEvents() {
    this.flMultipleLvi.on('touch', () => this.router.push('PgListviewMultipleLvi'));
    this.flPagination.on('touch', () => this.router.push('PgListviewPagination'));
    this.flStickyItem.on('touch', () => this.router.push('PgListviewSticky'));
    this.flSwipeItem.on('touch', () => this.router.push('PgListviewSwipe'));
    this.flDragDrop.on('touch', () => this.router.push('PgListviewDragDrop'));
    this.flZebra.on('touch', () => this.router.push('PgListviewZebra'));
    this.flExtendShrink.on('touch', () => this.router.push('PgListViewExtendShrink'));
    this.flDynamicLine.on('touch', () => this.router.push('PgListViewDynamicHeight'));
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initLabels();
    this.initPressEvents();
  }
}
