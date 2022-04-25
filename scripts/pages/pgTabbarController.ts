import { Router, Route } from '@smartface/router';
import TabBarController from '@smartface/native/ui/tabbarcontroller';
import PgPicker from 'pages/pgPicker';
import PgLabel from 'pages/pgLabel';
import PgCrypto from 'pages/pgCrypto';
import TabbarItem from '@smartface/native/ui/tabbaritem';
import Color from '@smartface/native/ui/color';

export default class PgTabbarController extends TabBarController {
  pages = [PgPicker, PgLabel, PgCrypto];
  items = this.pages.map((page) => new TabbarItem({ title: page.name, icon: 'images://arrowbottom.png' }));
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  onPageCreate(index: number) {
    return new this.pages[index](this.router, this.route);
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.headerBar.title = this.constructor.name; //Tabbarcontroller requires manual setup
    this.scrollEnabled = true;
    this.indicatorColor = Color.BLACK;
    this.indicatorHeight = 3;
    this.barColor = Color.create('#F3F0F0');
    this.textColor = {
      normal: Color.BLACK,
      selected: Color.create('#00A1F1')
    };
    this.autoCapitalize = true;
  }
}
