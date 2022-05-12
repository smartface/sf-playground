import PgListviewSwipeDesign from 'generated/pages/pgListviewSwipe';
import { Route, Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import ListView from '@smartface/native/ui/listview';
import { themeService } from 'theme';
import { StyleContextComponentType } from '@smartface/styling-context';
import LviTitle from 'components/LviTitle';
import SwipeItem from '@smartface/native/ui/swipeitem';

type DatasetType = { title: string };
export default class PgListviewSwipe extends withDismissAndBackButton(PgListviewSwipeDesign) {
  private disposeables: (() => void)[] = [];
  myDataSet: DatasetType[] = Array.from({ length: 10 }).map((_, index: number) => ({
    title: `Smartface Title ${index}`
  }));
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  deleteAndRefresh(e: { index: number }): void {
    this.myDataSet.splice(e.index, 1);
    this.lvMain.itemCount = this.myDataSet.length;
    this.lvMain.deleteRowRange({
      itemCount: 1,
      positionStart: e.index,
      ios: {
        animation: ListView.iOS.RowAnimation.FADE
      }
    });
    this.lvMain.refreshRowRange({
      itemCount: 1,
      positionStart: this.myDataSet.length - 1
    });
  }
  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.lvMain.itemCount = this.myDataSet.length;
    this.lvMain.refreshData();
  }
  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.headerBar.leftItemEnabled = false;

    this.lvMain.onRowBind = (ListViewItem: LviTitle, index) => {
      ListViewItem.lblTitle.text = this.myDataSet[index].title;
    };
    this.lvMain.onRowSwipe = (e) => {
      const deleteItem = new ListView.SwipeItem() as StyleContextComponentType<SwipeItem>;
      const editItem = new ListView.SwipeItem() as StyleContextComponentType<SwipeItem>;

      const items: SwipeItem[] = [];

      if (e.direction === ListView.SwipeDirection.RIGHTTOLEFT) {
        deleteItem.text = 'Delete';
        themeService.addGlobalComponent(deleteItem as any, `deleteItem-${e.index}`);
        deleteItem.onPress = () => {
          this.deleteAndRefresh(e);
        };
        deleteItem.dispatch({
          type: 'pushClassNames',
          classNames: '.swipeItem.delete'
        });
        items.push(deleteItem);
      } else if (e.direction === ListView.SwipeDirection.LEFTTORIGHT) {
        themeService.addGlobalComponent(editItem as any, `editItem-${e.index}`);
        editItem.text = 'Edit';
        editItem.onPress = () => {
          // edit code here
        };
        editItem.dispatch({
          type: 'pushClassNames',
          classNames: '.swipeItem.edit'
        });
        items.push(editItem);
      }
      e.ios.expansionSettings.buttonIndex = 0;
      return items;
    };
    this.lvMain.onRowCanSwipe = (index: number) => {
      return [ListView.SwipeDirection.RIGHTTOLEFT, ListView.SwipeDirection.LEFTTORIGHT];
    };
    this.lvMain.swipeEnabled = true;
    this.lvMain.rowHeight = 70;
    this.lvMain.refreshEnabled = false;
  }

  onHide(): void {
    this.dispose();
  }

  dispose(): void {
    this.disposeables.forEach((item) => item());
  }
}
