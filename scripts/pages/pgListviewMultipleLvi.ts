import PgListviewMultipleLviDesign from 'generated/pages/pgListviewMultipleLvi';
import Application from '@smartface/native/application';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import PageTitleLayout from 'components/PageTitleLayout';
import ListViewItem from '@smartface/native/ui/listviewitem';
import { withDismissAndBackButton } from '@smartface/mixins';

class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableListViewItem extends styleableContainerComponentMixin(ListViewItem) {}

type RowDataType = string[][];
type DataType = { isHeader: boolean; data: string };

//You should create new Page from UI-Editor and extend with it.
export default class PgListviewMultipleLvi extends withDismissAndBackButton(PgListviewMultipleLviDesign) {
  index: number = 0;
  headerData: string[] = ['Complementary', 'Analogous', 'Tetradic', 'Monochromatic'];
  rowData: string[][] = [
    ['#ffb8c9', '#b8ffee'],
    ['#ffb8ed', '#ffb8c9', '#ffcbb8'],
    ['#eeb8ff', '#ffb8c9', '#c9ffb8', '#b8ffee'],
    ['#ff6c8f', '#ff85a2', '#ff9fb6', '#ffb8c9', '#ffd2dc', '#ffebf0']
  ];
  dataArray: DataType[] = this.pushDataToArray(this.headerData, this.rowData);

  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  pushDataToArray(headerData: string[], rowData: RowDataType): DataType[] {
    let dataArray: DataType[] = new Array<DataType>();
    for (var i = 0; i < headerData.length; i++) {
      dataArray.push({ isHeader: true, data: headerData[i] });
      for (var j = 0; j < rowData[i].length; j++) {
        dataArray.push({ isHeader: false, data: rowData[i][j] });
      }
    }
    return dataArray;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();

    const { dataArray } = this;
    this.headerBar.titleLayout = new PageTitleLayout();

    this.lvMain.itemCount = dataArray.length;

    this.lvMain.onRowCreate = (type) => {
      let myListViewItem = new StyleableListViewItem();
      this.lvMain.dispatch({
        type: 'addChild',
        component: myListViewItem,
        name: `myListViewItem${++this.index}`
      });
      if (type == 1) {
        let myLabelTitle = new StyleableLabel();
        myListViewItem.addChild(myLabelTitle, `myLabelTitle${this.index}`, '.sf-label', {
          flexProps: {
            flexGrow: 1
          },
          textAlignment: 'MIDCENTER',
          borderRadius: 10,
          margin: 10
        });
        myListViewItem['myLabelTitle'] = myLabelTitle;
      } else {
        // Header
        let myLabelTitle = new Label();
        myLabelTitle.font = Font.create(Font.DEFAULT, 30, Font.BOLD);
        myLabelTitle.backgroundColor = Color.WHITE;
        myListViewItem.addChild(myLabelTitle, `myLabelTitle${this.index}`, '.sf-label', {
          flexProps: {
            flexGrow: 1
          },
          borderRadius: 10,
          margin: 10,
          font: {
            size: 30,
            bold: true,
            family: 'SFProText',
            style: 'Semibold'
          }
        });
        myListViewItem['myLabelTitle'] = myLabelTitle;
      }
      return myListViewItem;
    };

    this.lvMain.onRowHeight = function (index) {
      if (dataArray[index].isHeader) {
        return 100;
      }
      return 70;
    };

    this.lvMain.onRowBind = function (listViewItem: ListViewItem & { myLabelTitle: Label }, index) {
      const { myLabelTitle } = listViewItem;

      if (dataArray[index].isHeader) {
        myLabelTitle.text = dataArray[index].data;
      } else {
        myLabelTitle.backgroundColor = Color.create(dataArray[index].data);
        myLabelTitle.text = dataArray[index].data;
      }
    };

    this.lvMain.onRowType = function (index) {
      if (dataArray[index].isHeader) {
        return 2;
      } else {
        return 1;
      }
    };

    this.lvMain.onPullRefresh = () => {
      let header = ['Triadic'];
      let row = [['#b8c9ff', '#ffb8c9', '#c9ffb8']];
      this.pushDataToArray(header, row);
      this.lvMain.itemCount = dataArray.length;
      this.lvMain.refreshData();
      this.lvMain.stopRefresh();
    };

    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0
      }
    });
  }
}
