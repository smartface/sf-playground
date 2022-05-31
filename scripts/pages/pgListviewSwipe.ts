import PgListviewSwipeDesign from 'generated/pages/pgListviewSwipe';
import { Route, Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { RowAnimation } from '@smartface/native/ui/listview/listview';
import LviTitle from 'components/LviTitle';

type DatasetType = { title: string };
export default class PgListviewSwipe extends withDismissAndBackButton(PgListviewSwipeDesign) {
  myDataSet: DatasetType[] = Array.from({ length: 10 }).map((_, index: number) => ({
    title: `Smartface Title ${index}`
  }));
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initListView() {
    this.lvg.processor = () => {
      this.lvg.items = this.myDataSet.map((v) => {
        return this.lvg.getProcessedListViewItem<LviTitle>(
          LviTitle,
          {
            title: v.title
          },
          {
            swipeActions: {
              swipeOnDelete: (e) => {
                this.myDataSet.splice(e.index, 1);
                this.lvg.itemCount = this.myDataSet.length;
                this.lvg.processor();
                this.lvg.deleteRowRange({ positionStart: e.index || 0, itemCount: 1, ios: { animation: RowAnimation.AUTOMATIC } });
              }
            }
          }
        );
      });
    };
    this.lvg.swipeEnabled = true;
    this.lvg.refreshEnabled = false;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.lvg.refreshData();
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
