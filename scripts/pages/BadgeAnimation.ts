import PgBadgeAnimationDesign from 'generated/pages/BadgeAnimation';
import System from '@smartface/native/device/system';
import Animator from '@smartface/native/ui/animator';
import LviBadge from 'components/LviBadge';
import FlImage from 'components/FlImage';
import { withDismissAndBackButton } from '@smartface/mixins';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';

export default class PgBadgeAnimation extends withDismissAndBackButton(PgBadgeAnimationDesign) {
  scrollData: string[] = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
    let firstLetter = 65;
    this.scrollData = Array(26)
      .fill(firstLetter)
      .map((number) => String.fromCharCode(firstLetter++));
  }

  initListView() {
    this.myListView.onPullRefresh = () => {
      this.refreshListView();
      this.myListView.stopRefresh();
    };

    this.myListView.onRowSelected = (listViewItem: LviBadge, index: number) => {
      console.log('selected index = ' + index);
      const visibleScale = { x: 1, y: 1 };
      const inVisibleScale = { x: 0, y: 0 };
      const animationTime = 150;
      const flexlayouts: FlImage[] = [listViewItem.flImage, listViewItem.flImage1, listViewItem.flImage2, listViewItem.flImage3, listViewItem.flImage4];
      flexlayouts.forEach((layout) => {
        layout.scale = inVisibleScale;
      });

      Animator.animate(flexlayouts[0].getParent(), animationTime, () => {
        flexlayouts[0].scale = visibleScale;
      })
        .then(animationTime, () => (flexlayouts[1].scale = visibleScale))
        .then(animationTime, () => (flexlayouts[2].scale = visibleScale))
        .then(animationTime, () => (flexlayouts[3].scale = visibleScale))
        .then(animationTime, () => (flexlayouts[4].scale = visibleScale))
        .complete(() => {
          console.log(' Animation is over ');
        });
    };
  }

  refreshListView() {
    this.myListView.refreshData();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
