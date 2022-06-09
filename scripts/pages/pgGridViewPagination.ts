import PgGridViewPaginationDesign from 'generated/pages/pgGridViewPagination';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import GviTitle from 'components/GviTitle';
import System from '@smartface/native/device/system';
import GridView from '@smartface/native/ui/gridview';
import Screen from '@smartface/native/device/screen';
import { IColor } from '@smartface/native/ui/color/color';

type DatasetType = { title: string; backgroundColor: IColor };
const SPAN_COUNT: number = 1;
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

export default class PgGridViewPagination extends withDismissAndBackButton(PgGridViewPaginationDesign) {
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

  initGridView() {
    this.gvMain.layoutManager.onItemLength = () => Screen.width;

    this.gvMain.layoutManager.ios.targetContentOffset = (proposedContentOffset, velocity) => {
      let positionX = this.gvMain.contentOffset.x / Screen.width;
      let decimalPositionX = positionX;
      let precisionPositionX = positionX % 1;

      if (velocity.x == 0 && precisionPositionX >= 0.5) {
        decimalPositionX = decimalPositionX + 1;
      } else if (velocity.x > 0) {
        decimalPositionX = decimalPositionX + 1;
      }

      return { x: decimalPositionX * Screen.width, y: 0 };
    };
    this.gvMain.backgroundColor = Color.TRANSPARENT;
    this.gvMain.android.paginationEnabled = true;
    this.gvMain.scrollBarEnabled = false;
    this.gvMain.refreshEnabled = false;
    this.gvMain.itemCount = this.myDataset.length;
    this.gvMain.onItemBind = (gridViewItem: GviTitle, index) => {
      let { title, backgroundColor } = this.myDataset[this.myDataset.length - index - 1];
      gridViewItem.lblTitle.text = title;
      gridViewItem.lblTitle.backgroundColor = backgroundColor;
      gridViewItem.applyLayout();
    };
    this.gvMain.ios.decelerationRate = GridView.iOS.DecelerationRate.FAST;
    this.gvMain.layoutManager.contentInset = { top: 0, left: 0, bottom: 0, right: 20 };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initGridView();
  }
}
