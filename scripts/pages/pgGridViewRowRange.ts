import PgGridViewRowRangeDesign from 'generated/pages/pgGridViewRowRange';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import GviTitle from 'components/GviTitle';
import System from '@smartface/native/device/system';
import Screen from '@smartface/native/device/screen';
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

export default class PgGridViewRowRange extends withDismissAndBackButton(PgGridViewRowRangeDesign) {
  myDataset: DatasetType[] = this.generateDataset();
  refreshCount = 0;
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

  initButtonPressEvents() {
    this.btnInsert.on('press', () => {
      this.insertRowToDataset();
      this.gvMain.itemCount = this.myDataset.length;
      this.gvMain.insertRowRange({ positionStart: 0, itemCount: 1 });
      if (System.OS === System.OSType.ANDROID) {
        this.gvMain.scrollTo(0);
      }
    });

    this.btnRefresh.on('press', () => {
      this.myDataset[0].title = `New Title ${this.refreshCount}`;
      this.refreshCount++;
      this.gvMain.itemCount = this.myDataset.length;
      this.gvMain.refreshRowRange({ positionStart: 0, itemCount: 1 });
    });

    this.btnDelete.on('press', () => {
      this.myDataset.splice(0, 1);
      this.gvMain.deleteRowRange({ positionStart: 0, itemCount: 1 });
      this.gvMain.itemCount = this.myDataset.length;
    });
  }

  insertRowToDataset() {
    this.myDataset.unshift({ title: 'New Item', backgroundColor: Color.RED });
  }

  initGridView() {
    this.gvMain.layoutManager.onItemLength = () => Screen.width;
    this.gvMain.itemCount = this.myDataset.length;
    this.gvMain.refreshEnabled = false;
    this.gvMain.scrollBarEnabled = false;
    this.gvMain.onItemBind = (gridViewItem: GviTitle, index) => {
      let { title, backgroundColor } = this.myDataset[index];
      gridViewItem.lblTitle.text = title;
      gridViewItem.lblTitle.backgroundColor = backgroundColor;
    };
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
    this.initButtonPressEvents();
  }
}
