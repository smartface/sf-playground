import PgGridViewFullSpanDesign from 'generated/pages/pgGridViewFullSpan';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import Screen from '@smartface/native/device/screen';
import GviTitle from 'components/GviTitle';
import GridView from '@smartface/native/ui/gridview';
import { IColor } from '@smartface/native/ui/color/color';

type DatasetType = { title: string; backgroundColor: IColor };
const COLORS: string[] = [
  '#ffffff',
  '#e6f7ff',
  '#cceeff',
  '#b3e6ff',
  '#99ddff',
  '#80d4ff',
  '#66ccff',
  '#4dc3ff',
  '#33bbff',
  '#1ab2ff',
  '#00aaff',
  '#0099e6',
  '#0088cc',
  '#0077b3',
  '#006699'
];
const SPAN_COUNT: number = 2;

export default class PgGridViewFullSpan extends withDismissAndBackButton(PgGridViewFullSpanDesign) {
  index: number = 0;
  myDataset: DatasetType[] = this.generateDataset();
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  generateDataset(): DatasetType[] {
    let dataset: DatasetType[] = [];
    for (let i = 0; i < 12; ++i) {
      dataset.push({
        title: `Smartface Title ${i}`,
        backgroundColor: Color.create(COLORS[i % COLORS.length])
      });
    }
    return dataset;
  }

  initGridViewEvents() {
    // We might want to test this with eventemitter as well.
    this.gvMain.layoutManager.onFullSpan = (type) => {
      if (type == 1) {
        return 200;
      } else if (type == 2) {
        return 50;
      }
      return undefined;
    };

    // We might want to test this with eventemitter as well.
    this.gvMain.layoutManager.onItemLength = () => Screen.width / SPAN_COUNT;

    // We might want to test this with eventemitter as well.
    this.gvMain.onItemType = (index) => {
      if (index === 0) {
        return 1;
      } else if (index === 1) {
        return 2;
      }
      return 3;
    };

    // We might want to test this with eventemitter as well.
    this.gvMain.onItemBind = (gridViewItem: GviTitle, index) => {
      let { title, backgroundColor } = this.myDataset[index];
      gridViewItem.lblTitle.text = title;
      gridViewItem.lblTitle.backgroundColor = backgroundColor;
    };

    this.gvMain.on('itemSelected', (gridViewItem: GviTitle, index) => {
      console.log(`Item title : ${gridViewItem.lblTitle.text}`);
    });
    this.gvMain.on('pullRefresh', () => {
      console.log('Gridview onPullRefresh');
    });
    this.gvMain.on('scroll', () => {
      console.log('Gridview onScroll');
    });
    this.gvMain.on('itemLongSelected', () => {
      console.log('Gridview itemLongSelected');
    });
    this.gvMain.on('attachedToWindow', () => {
      console.log('Gridview attachedToWindow');
    });
    this.gvMain.on('detachedFromWindow', () => {
      console.log('Gridview detachedFromWindow');
    });
    // this.gvMain.on("gesture", () => {
    //     console.log('Gridview gesture'); // This needs to be tested as well
    // })
    this.gvMain.on('scrollBeginDecelerating', () => {
      console.log('Gridview scrollBeginDecelerating');
    });
    this.gvMain.on('scrollBeginDragging', () => {
      console.log('Gridview scrollBeginDragging');
    });
    this.gvMain.on('scrollEndDecelerating', () => {
      console.log('Gridview scrollEndDecelerating');
    });
    this.gvMain.on('scrollEndDraggingWillDecelerate', () => {
      console.log('Gridview scrollEndDraggingWillDecelerate');
    });
    this.gvMain.on('scrollEndDraggingWithVelocityTargetContentOffset', () => {
      console.log('Gridview scrollEndDraggingWithVelocityTargetContentOffset');
    });
    this.gvMain.on('scrollStateChanged', () => {
      console.log('Gridview scrollStateChanged');
    });
  }

  initGridView() {
    this.gvMain.refreshEnabled = true;
    this.gvMain.backgroundColor = Color.TRANSPARENT;
    this.gvMain.itemCount = this.myDataset.length;
    this.gvMain.scrollBarEnabled = false;
    this.initGridViewEvents();
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
    this.initGridView();
  }
}
