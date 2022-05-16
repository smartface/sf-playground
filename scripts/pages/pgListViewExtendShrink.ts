import PgListViewExtendShrinkDesign from 'generated/pages/pgListViewExtendShrink';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviCompanyInfo from 'components/LviCompanyInfo';
import LviCompanyInfoExtended from 'components/LviCompanyInfoExtended';
import { addChild } from '@smartface/styling-context';
import { faker } from '@faker-js/faker';
import { hideWaitDialog, showWaitDialog } from 'lib/LoadingIndicator';
import { RowAnimation } from '@smartface/native/ui/listview/listview';

let currentIndex = -1;

enum ListViewTypes {
  EXTENDED,
  SHRINKED
}

const LviClasses = {
  [ListViewTypes.EXTENDED]: LviCompanyInfoExtended,
  [ListViewTypes.SHRINKED]: LviCompanyInfo
};

type Companies = {
  name: string;
  section: string;
  info: string;
};

type ListViewData = {
  type: ListViewTypes;
  height: number;
  properties: Partial<LviCompanyInfo> | Partial<LviCompanyInfoExtended>;
};

export default class PgListViewExtendShrink extends withDismissAndBackButton(PgListViewExtendShrinkDesign) {
  private _serviceData: Companies[] = [];
  private _listViewData: ListViewData[] = [];
  private _extendedIndexes: number[] = [];
  private _maxCount = 0;
  private _page = 1;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.button1.on('press', () => this.fakeRequest());
  }

  async fakeRequest(page = 1): Promise<void> {
    return new Promise((resolve) => {
      showWaitDialog();
      setTimeout(() => {
        resolve(
          new Array(10).fill(0).map(() => {
            return {
              name: faker.company.companyName(),
              section: faker.company.bs(),
              info: faker.lorem.paragraph(5)
            };
          })
        );
      }, 1000);
    })
      .then((companies: Companies[]) => {
        if (page === 1) {
          this._serviceData = companies;
        } else {
          this._serviceData = this._serviceData.concat(companies);
        }
        this._maxCount = 50;
        this._page = page;
      })
      .finally(() => hideWaitDialog());
  }

  mapListViewData() {
    this._listViewData = this._serviceData.map((v, index) => {
      const isExtended = this._extendedIndexes.includes(index);
      return {
        height: isExtended ? LviCompanyInfoExtended.getHeight() : LviCompanyInfo.getHeight(),
        type: isExtended ? ListViewTypes.EXTENDED : ListViewTypes.SHRINKED,
        properties: {
          info: v.info,
          name: v.name,
          section: v.section,
          onImageClick: () => {
            if (isExtended) {
              this._extendedIndexes = this._extendedIndexes.filter((v, _internalIndex) => v !== index);
            } else {
              this._extendedIndexes.push(index);
            }
            this.mapListViewData();
            this.lv.refreshRowRange({ positionStart: index, itemCount: 1, ios: { animation: RowAnimation.AUTOMATIC } });
          }
        }
      };
    });
  }

  refreshListView() {
    this.mapListViewData();
    this.lv.itemCount = this._listViewData.length;
    this.lv.refreshData();
  }

  initListView() {
    this.lv.refreshEnabled = false;
    this.lv.onRowCreate = (type: ListViewTypes) => {
      const LviClass = LviClasses[type];
      const listViewItem = new LviClass();
      this.lv.dispatch(addChild(`listViewItem${++currentIndex}`, listViewItem));
      return listViewItem;
    };
    this.lv.onRowHeight = (index) => {
      return this._listViewData[index].height;
    };
    this.lv.onRowType = (index) => {
      return this._listViewData[index].type;
    };
    this.lv.onRowBind = (listViewItem: LviCompanyInfo | LviCompanyInfoExtended, index) => {
      listViewItem.name = this._listViewData[index].properties.name;
      listViewItem.section = this._listViewData[index].properties.section;
      if (listViewItem instanceof LviCompanyInfoExtended) {
        listViewItem.info = (this._listViewData[index].properties as LviCompanyInfoExtended).info;
      }
      listViewItem.separatorVisible = this._listViewData.length - 1 !== index; //If not last item
      listViewItem.onImageClick = this._listViewData[index].properties.onImageClick;
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.fakeRequest().then(() => this.refreshListView());
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
