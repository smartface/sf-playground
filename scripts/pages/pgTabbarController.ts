import { Router, Route } from '@smartface/router';
import TabBarController from '@smartface/native/ui/tabbarcontroller';
import PgLabel from 'pages/pgLabel';
import TabbarItem from '@smartface/native/ui/tabbaritem';
import Color from '@smartface/native/ui/color';
import OverScrollMode from '@smartface/native/ui/shared/android/overscrollmode';

export default class PgTabbarController extends TabBarController {
  pages = [PgLabel, PgLabel, PgLabel, PgLabel, PgLabel, PgLabel];
  items = this.pages.map((page) => new TabbarItem({ title: page.name, icon: 'images://arrowbottom.png' }));
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  onSelected(index: number) {
    console.info('onSelected: ', index);
  }

  onPageCreate(index: number) {
    return new this.pages[index](this.router, this.route);
  }

  updateStyles() {
    this.barHeight = 22;
    this.android.dividerColor = Color.RED;
    this.android.dividerPadding = 2;
    this.android.dividerWidth = 11;
    this.android.overScrollMode = OverScrollMode.ALWAYS;
    this.pagingEnabled = true;
    this.scrollEnabled = false;
    this.autoCapitalize = false;
    this.headerBar.title = 'Tabbar Controller'; //Tabbarcontroller requires manual setup
    this.indicatorColor = Color.BLACK;
    this.indicatorHeight = 3;
    this.barColor = Color.create('#F3F0F0');
    this.textColor = {
      normal: Color.BLACK,
      selected: Color.create('#00A1F1')
    };
  }

  onShow() {
    super.onShow();
    this.updateStyles();
  }

  onLoad() {
    super.onLoad();
  }
}
