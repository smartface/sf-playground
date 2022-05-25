import PgListviewStickyDesign from 'generated/pages/pgListviewSticky';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import ListViewItem from '@smartface/native/ui/listviewitem';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { withDismissAndBackButton } from '@smartface/mixins';

class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableListViewItem extends styleableContainerComponentMixin(ListViewItem) {}
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

type RowDataType = Array<Array<string>>;
type DataType = { isHeader: boolean; data: string };

//You should create new Page from UI-Editor and extend with it.
export default class PgListviewSticky extends withDismissAndBackButton(PgListviewStickyDesign) {
  index: number = 0;
  headerData: string[] = ['Complementary', 'Analogous', 'Tetradic', 'Monochromatic'];
  rowData: Array<Array<string>> = [
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
    this.lvMain.itemCount = dataArray.length;
    this.lvMain.refreshEnabled = false;

    this.lvMain.onRowCreate = (type: number) => {
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
        myListViewItem.myLabelTitle = myLabelTitle;
      } else {
        // Header
        let myLabelTitle = new StyleableLabel();
        myListViewItem.addChild(myLabelTitle, `myLabelTitle${this.index}`, '.sf-label', {
          flexProps: {
            flexGrow: 1
          },
          borderRadius: 10,
          margin: 10,
          backgroundColor: '#FFFFFF',
          font: {
            size: 30,
            bold: true,
            family: 'SFProText',
            style: 'Semibold'
          }
        });
        myListViewItem.myLabelTitle = myLabelTitle;
      }
      return myListViewItem;
    };

    this.lvMain.onRowHeight = function (index: number) {
      if (dataArray[index].isHeader) {
        return 100;
      }
      return 70;
    };

    this.lvMain.onRowBind = function (listViewItem: any, index: number) {
      const { myLabelTitle } = listViewItem;

      if (dataArray[index].isHeader) {
        myLabelTitle.text = dataArray[index].data;
      } else {
        myLabelTitle.backgroundColor = Color.create(dataArray[index].data);
        myLabelTitle.text = dataArray[index].data;
      }
    };

    this.lvMain.onRowType = (index: number): number => {
      if (dataArray[index].isHeader) {
        return 2;
      } else {
        return 1;
      }
    };

    this.lvMain.on('scroll', (params) => {
      if (params.contentOffset.y >= 240) {
        headerSticky.visible = true;
      } else {
        headerSticky.visible = false;
      }

      if (params.contentOffset.y + this.lvMain.height >= 1030) {
        footerSticky.visible = false;
      } else {
        footerSticky.visible = true;
      }
    });

    let headerSticky = new StyleableFlexLayout();

    this.addChild(headerSticky, 'headerSticky', '.sf-flexlayout', (userProps: any) => {
      userProps.visible = false;
      userProps.height = 100;
      userProps.left = 0;
      userProps.right = 0;
      userProps.top = 0;
      userProps.positionType = 'ABSOLUTE';

      return userProps;
    });

    let myLabelTitle = new StyleableLabel({
      text: 'Analogous'
    });

    headerSticky.addChild(myLabelTitle, 'myLabelTitle', '.sf-label', (userProps: any) => {
      userProps.flexGrow = 1;
      userProps.marginLeft = 30;
      userProps.marginRight = 10;
      userProps.font = {
        size: 30,
        bold: true,
        family: 'SFProText',
        style: 'Semibold'
      };
      userProps.backgroundColor = '#FFFFFF';

      return userProps;
    });

    let footerSticky = new StyleableFlexLayout();
    this.addChild(footerSticky, 'footerSticky', '.sf-flexlayout', (userProps: any) => {
      userProps.visible = true;
      userProps.height = 100;
      userProps.left = 0;
      userProps.right = 0;
      userProps.bottom = 0;
      userProps.positionType = 'ABSOLUTE';

      return userProps;
    });

    let myLabelTitle2 = new Label({
      text: 'Monochromatic'
    });

    footerSticky.addChild(myLabelTitle2, 'myLabelTitle2', '.sf-label', (userProps: any) => {
      userProps.flexGrow = 1;
      userProps.marginLeft = 30;
      userProps.marginRight = 10;
      userProps.font = {
        size: 30,
        bold: true,
        family: 'SFProText',
        style: 'Semibold'
      };
      userProps.backgroundColor = '#FFFFFF';

      return userProps;
    });
  }
}
