import PgListViewIndexDesign from "generated/pages/pgListViewIndex";
import FlexLayout from "@smartface/native/ui/flexlayout";
import ListView from "@smartface/native/ui/listview";
import ListViewIndex from "@smartface/extension-listviewindex";
import ListViewItem from "@smartface/native/ui/listviewitem";
import Label from "@smartface/native/ui/label";
import Color from "@smartface/native/ui/color";
import Font from "@smartface/native/ui/font";
import System from "@smartface/native/device/system";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgListViewIndex extends withDismissAndBackButton(PgListViewIndexDesign) {
  listViewItemArray: any[] = [];
  listViewItemIndexItems = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  myListView: ListView;
  headerIndex: number[] = [];
  listViewIndex = new ListViewIndex();
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
  }

  initListView() {
    var _rowData = [];
    for (var i = 0; i < this.listViewItemIndexItems.length; i++) {
      _rowData.push(["#ff6c8f", "#ff85a2", "#ff9fb6", "#ffb8c9", "#ffd2dc", "#ffebf0"]);
    }

    const pushDataToArray = (headerData, rowData) => {
      for (var i = 0; i < headerData.length; i++) {
        this.listViewItemArray.push({ isHeader: true, data: headerData[i] });
        this.headerIndex.push(this.listViewItemArray.length - 1);
        for (var j = 0; j < rowData[i].length; j++) {
          this.listViewItemArray.push({ isHeader: false, data: rowData[i][j] });
        }
      }
    };
    pushDataToArray(this.listViewItemIndexItems, _rowData);
    this.myListView = new ListView({
      flexGrow: 1,
      marginLeft: 20,
      itemCount: this.listViewItemArray.length,
    });

    this.layout.addChild(this.myListView);
    this.myListView.onRowCreate = (type) => {
      var myListViewItem: ListViewItem & { myLabelTitle?: Label } = new ListViewItem();

      if (type == 1) {
        var myLabelTitle = new Label({
          flexGrow: 1,
          margin: 10,
        });
        myLabelTitle.textColor = Color.WHITE;
        myLabelTitle.borderRadius = 10;
        myListViewItem.addChild(myLabelTitle);
        myListViewItem.myLabelTitle = myLabelTitle;
      } else {
        // Header
        var myLabelTitle = new Label({
          flexGrow: 1,
          margin: 10,
        });
        myLabelTitle.font = Font.create(Font.DEFAULT, 30, Font.BOLD);
        myLabelTitle.backgroundColor = Color.WHITE;
        myListViewItem.addChild(myLabelTitle);
        myListViewItem.myLabelTitle = myLabelTitle;
      }

      return myListViewItem;
    };

    this.myListView.onRowHeight = (index) => {
      if (this.listViewItemArray[index].isHeader) {
        return 100;
      }
      return 70;
    };

    this.myListView.onRowBind = (listViewItem, index) => {
      //@ts-ignore
      var myLabelTitle = listViewItem.myLabelTitle;

      if (this.listViewItemArray[index].isHeader) {
        myLabelTitle.text = typeof this.listViewItemArray[index].data === "string" ? this.listViewItemArray[index].data : "Image";
      } else {
        myLabelTitle.backgroundColor = Color.create(this.listViewItemArray[index].data);
        myLabelTitle.text = this.listViewItemArray[index].data;
      }
    };

    this.myListView.onRowType = (index) => (this.listViewItemArray[index].isHeader ? 2 : 1);
  }
  initListViewIndex() {
    if (System.OS === System.OSType.ANDROID) {
      return;
    }
    this.listViewIndex.width = 20;
    this.listViewIndex.items = this.listViewItemIndexItems;
    this.listViewIndex.indexDidSelect = (index) => {
      this.myListView.scrollTo(this.headerIndex[index], true);
      return true; //haptic
    };
    System.OS === System.OSType.IOS && this.listViewIndex.reloadData();

    // this.listViewIndex.backgroundView.backgroundColor = Color.GREEN;
    // this.listViewIndex.backgroundColor = Color.BLUE;
    // this.listViewIndex.tintColor = Color.RED;
    // this.listViewIndex.itemSpacing = 5;
    // this.listViewIndex.font = Font.create("TimesNewRomanPS-BoldMT", 16);
    // this.listViewIndex.indexInset = { top: 10, left: 0, bottom: 10, right: 0 };
    // this.listViewIndex.indexOffset = { vertical: -2, horizontal: -2 };
    // this.listViewIndex.listViewIndexMinimumWidth = 40;

    this.layout.addChild(this.listViewIndex);
    this.layout.applyLayout();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initListView();
    this.initListViewIndex();
  }
}
