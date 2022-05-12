import PgListviewPaginationDesign from 'generated/pages/ListviewPagination';
import { Route, Router } from '@smartface/router';
import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';
import PageTitleLayout from 'components/PageTitleLayout';
import ListViewItem from '@smartface/native/ui/listviewitem';
import Timer from '@smartface/native/global/timer';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { withDismissAndBackButton } from '@smartface/mixins';

class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableActivityIndicator extends styleableComponentMixin(ActivityIndicator) {}
class StyleableListViewItem extends styleableContainerComponentMixin(ListViewItem) {}
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

type DatasetType = {
  title: String;
  subtitle?: String;
  backgroundColor?: Color;
};

const COLORS: string[] = ['#ffffff', '#e6f7ff', '#cceeff', '#b3e6ff', '#99ddff', '#80d4ff', '#66ccff', '#4dc3ff', '#33bbff', '#1ab2ff', '#00aaff', '#0099e6', '#0088cc', '#0077b3', '#006699'];

//You should create new Page from UI-Editor and extend with it.
export default class PgListviewPagination extends withDismissAndBackButton(PgListviewPaginationDesign) {
  index: number = 0;
  isLoading: boolean = false;
  myDataSet: DatasetType[] = Array.from({ length: 10 }).map((_, index: number) => ({
    title: `Smartface Title ${index}`,
    subtitle: `Smartface Subtitle ${index}`
  }));
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  pushMoreToDataset(count: number): void {
    for (let i = 0; i < count; i++) {
      this.myDataSet.push({
        title: 'Smartface Title ' + (this.myDataSet.length + 1),
        subtitle: 'Smartface Subitle ' + (this.myDataSet.length + 1)
      });
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();

    let { myDataSet, isLoading } = this;
    this.lvMain.itemCount = myDataSet.length + 1;
    this.lvMain.rowHeight = 100;
    this.lvMain.onRowCreate = (type) => {
      let myListViewItem = new StyleableListViewItem();
      this.lvMain.dispatch({
        type: 'addChild',
        component: myListViewItem,
        name: `myListViewItem${++this.index}`,
        classNames: '.sf-listViewItem',
        userStyle: {
          paddingTop: 5,
          paddingBottom: 5
        }
      });

      if (type == 2) {
        // Loading
        let loadingIndicator = new StyleableActivityIndicator();
        //@ts-ignore
        myListViewItem.loadingIndicator = loadingIndicator;
        myListViewItem.addChild(loadingIndicator, `loadingIndicator${this.index}`, '.sf-activityIndicator', {
          width: 35,
          height: 35,
          color: '#008000',
          flexProps: {
            positionType: 'ABSOLUTE'
          }
        });

        myListViewItem.dispatch({
          type: 'updateUserStyle',
          userStyle: {
            flexProps: {
              justifyContent: 'CENTER',
              alignItems: 'CENTER'
            }
          }
        });
      } else {
        let titleLayout = new StyleableFlexLayout();
        let titleLabel = new StyleableLabel();
        let subtitleLabel = new StyleableLabel();

        myListViewItem.addChild(titleLayout, `titleLayout${this.index}`, '.sf-flexLayout', {
          flexGrow: 1,
          backgroundColor: '#00A1F1'
        });

        titleLayout.addChild(titleLabel, `titleLabel${this.index}`, 'sf-label', {
          textAlignment: 'MIDCENTER',
          flexGrow: 1,
          textColor: '#FFFFFF'
        });
        //@ts-ignore
        titleLayout.titleLabel = titleLabel;

        titleLayout.addChild(subtitleLabel, `subtitleLabel${this.index}`, 'sf-label', {
          textAlignment: 'MIDCENTER',
          flexGrow: 1,
          textColor: '#FFFFFF'
        });
        //@ts-ignore
        titleLayout.subtitleLabel = subtitleLabel;

        //@ts-ignore
        myListViewItem.titleLayout = titleLayout;
      }

      return myListViewItem;
    };

    this.lvMain.onRowBind = (listViewItem, index) => {
      if (index === myDataSet.length) {
        // @ts-ignore
        listViewItem.loadingIndicator.visible = true;
      } else {
        // @ts-ignore
        listViewItem.titleLayout.titleLabel.text = myDataSet[index % myDataSet.length].title;
        // @ts-ignore
        listViewItem.titleLayout.subtitleLabel.text = myDataSet[index % myDataSet.length].subtitle;
      }

      if (index > myDataSet.length - 3 && !isLoading) {
        isLoading = true;
        Timer.setTimeout({
          task: () => {
            // Loading completed
            this.pushMoreToDataset(10);
            this.lvMain.itemCount = myDataSet.length + 1;
            this.lvMain.refreshData();
            isLoading = false;
          },
          delay: 1500
        });
      }
    };

    this.lvMain.onPullRefresh = () => {
      this.pushMoreToDataset(1);
      this.lvMain.itemCount = myDataSet.length + 1;
      this.lvMain.refreshData();
      this.lvMain.stopRefresh();
    };

    this.lvMain.onRowType = (index) => {
      if (myDataSet.length === index) {
        // Loading
        return 2;
      } else {
        return 1;
      }
    };
  }
}
