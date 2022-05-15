import PgListviewDragDropDesign from 'generated/pages/pgListviewDragDrop';
import Application from '@smartface/native/application';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import ListView from '@smartface/native/ui/listview';
import ListViewItem from '@smartface/native/ui/listviewitem';
import { withDismissAndBackButton } from '@smartface/mixins';

class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableListViewItem extends styleableContainerComponentMixin(ListViewItem) {}

type RowDataType = Array<Array<string>>;
type DataType = { isHeader: boolean; data: string };
const HEADER_TYPE: number = 2;
const GENERAL_TYPE: number = 1;

//You should create new Page from UI-Editor and extend with it.
export default class PgListviewDragDrop extends withDismissAndBackButton(PgListviewDragDropDesign) {
  index: number = 0;
  headerData: string[] = ['Complementary', 'Analogous'];
  rowData: Array<Array<string>> = [
    ['#eeb8ff', '#ffb8c9', '#c9ffb8', '#b8ffee'],
    ['#ff6c8f', '#ff85a2', '#ff9fb6', '#ffb8c9', '#ffd2dc', '#ffebf0']
  ];
  dataArray: DataType[] = this.pushDataToArray(this.headerData, this.rowData);

  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  array_move(arr: DataType[], old_index: number, new_index: number): DataType[] {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
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

  indexOfSecondHeader = () => this.dataArray.findIndex((data) => data.data === 'Analogous');

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();

    this.lvMain.itemCount = this.dataArray.length;
    this.lvMain.rowMoveEnabled = true;
    this.lvMain.onRowCreate = (type: number) => {
      let myListViewItem = new StyleableListViewItem();
      this.lvMain.dispatch({
        type: 'addChild',
        component: myListViewItem,
        name: `myListViewItem${++this.index}`
      });

      if (type === GENERAL_TYPE) {
        let myLabelTitle = new StyleableLabel();
        let myEditableLbl = new StyleableLabel({
          text: '-'
        });

        myListViewItem.addChild(myEditableLbl, `myEditableLbl${this.index}`, '.sf-label', {
          width: 30,
          height: 30,
          backgroundColor: '#cc3300',
          borderRadius: 15,
          textColor: '#FFFFFF',
          textAlignment: 'MIDCENTER'
        });

        myListViewItem.addChild(myLabelTitle, `myLabelTitle${this.index}`, '.sf-label', {
          width: null,
          height: null,
          flexGrow: 1,
          margin: 10,
          textColor: '#FFFFFF',
          borderRadius: 10,
          textAlignment: 'MIDCENTER'
        });

        //@ts-ignore
        myListViewItem.myLabelTitle = myLabelTitle;
        //@ts-ignore
        myListViewItem.myEditableLbl = myEditableLbl;
      } else {
        // Header
        let myLabelTitle = new StyleableLabel();
        myListViewItem.addChild(myLabelTitle, `myLabelTitle${this.index}`, '.sf-label', {
          width: null,
          height: null,
          flexGrow: 1,
          margin: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          textAlignment: 'MIDCENTER'
        });

        //@ts-ignore
        myListViewItem.myLabelTitle = myLabelTitle;
      }
      myListViewItem.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            flexDirection: 'ROW',
            alignItems: 'CENTER'
          }
        }
      });

      return myListViewItem;
    };
    this.lvMain.onRowHeight = (index: number): number => {
      if (this.dataArray[index].isHeader) {
        return 70;
      }
      return 40;
    };
    this.lvMain.onRowBind = (listViewItem: ListViewItem, index: number) => {
      //@ts-ignore
      const { myLabelTitle, myEditableLbl } = listViewItem;

      if (this.dataArray[index].isHeader) {
        myLabelTitle.text = this.dataArray[index].data;
      } else {
        myLabelTitle.backgroundColor = Color.create(this.dataArray[index].data);
        myLabelTitle.text = this.dataArray[index].data;
        if (index > this.indexOfSecondHeader()) {
          myEditableLbl.text = '+';
          myEditableLbl.backgroundColor = Color.GREEN;
          myEditableLbl.onTouch = (): boolean => {
            console.info('TOUCH LABEL');
            let index = this.lvMain.indexByListViewItem(listViewItem);
            let prevData = this.dataArray[index];
            this.dataArray.splice(index, 1);
            this.lvMain.itemCount = this.dataArray.length;
            this.lvMain.deleteRowRange({
              positionStart: index,
              itemCount: 1,
              ios: {
                animation: ListView.iOS.RowAnimation.FADE
              }
            });
            this.dataArray.splice(this.indexOfSecondHeader(), 0, prevData);
            this.lvMain.itemCount = this.dataArray.length;
            this.lvMain.insertRowRange({
              positionStart: this.indexOfSecondHeader() - 1,
              itemCount: 1,
              ios: {
                animation: ListView.iOS.RowAnimation.FADE
              }
            });
            return false;
          };
        } else {
          myEditableLbl.text = '-';
          myEditableLbl.backgroundColor = Color.RED;
          myEditableLbl.onTouch = (): boolean => {
            let index = this.lvMain.indexByListViewItem(listViewItem);
            let prevData = this.dataArray[index];
            this.dataArray.splice(index, 1);
            this.lvMain.itemCount = this.dataArray.length;
            this.lvMain.deleteRowRange({
              positionStart: index,
              itemCount: 1,
              ios: {
                animation: ListView.iOS.RowAnimation.FADE
              }
            });
            this.dataArray.splice(this.indexOfSecondHeader() + 1, 0, prevData);
            this.lvMain.itemCount = this.dataArray.length;
            this.lvMain.insertRowRange({
              positionStart: this.indexOfSecondHeader() + 1,
              itemCount: 1,
              ios: {
                animation: ListView.iOS.RowAnimation.FADE
              }
            });
            return false;
          };
        }
      }
    };
    this.lvMain.onRowType = (index: number): number => {
      if (this.dataArray[index].isHeader) {
        return HEADER_TYPE;
      } else {
        return GENERAL_TYPE;
      }
    };
    this.lvMain.onRowMoved = (source: number, dest: number) => {
      this.dataArray = this.array_move(this.dataArray, source, dest);
    };
    this.lvMain.onRowMove = (sourceIndex: number, desIndex: number): boolean => {
      if (this.dataArray[desIndex].isHeader || desIndex > this.indexOfSecondHeader()) {
        return false;
      }
      return true;
    };
    this.lvMain.onRowCanMove = (index: number) => {
      if (!this.dataArray[index].isHeader && this.indexOfSecondHeader() > index) {
        return true;
      }
      return false;
    };
    this.lvMain.onPullRefresh = () => {
      this.lvMain.itemCount = this.dataArray.length;
      this.lvMain.refreshData();
      this.lvMain.stopRefresh();
    };
  }
}
