import { Router, Route } from '@smartface/router';
import TabBarController from '@smartface/native/ui/tabbarcontroller';
import PgPicker from 'pages/pgPicker';
import PgLabel from 'pages/pgLabel';
import PgCrypto from 'pages/pgCrypto';
import TabbarItem from '@smartface/native/ui/tabbaritem';
import Color from '@smartface/native/ui/color';
import OverScrollMode from '@smartface/native/ui/shared/android/overscrollmode';

export default class PgTabbarController extends TabBarController {
  pages = [PgPicker, PgLabel, PgCrypto, PgPicker, PgLabel, PgCrypto];
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

  onShow() {
    super.onShow();
    // setTimeout(() => this.setSelectedIndex(3, false), 2000);
  }

  onLoad() {
    super.onLoad();
    this.barHeight = 22;
    this.android.dividerColor = Color.RED;
    this.android.dividerPadding = 2;
    this.android.dividerWidth = 11;
    this.android.overScrollMode = OverScrollMode.ALWAYS;
    this.pagingEnabled = true;
    this.scrollEnabled = false;
    this.autoCapitalize = false;
    this.headerBar.title = this.constructor.name; //Tabbarcontroller requires manual setup
    this.indicatorColor = Color.BLACK;
    this.indicatorHeight = 3;
    this.barColor = Color.create('#F3F0F0');
    this.textColor = {
      normal: Color.BLACK,
      selected: Color.create('#00A1F1')
    };
  }
}
