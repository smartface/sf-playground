import PgListViewExtendShrinkDesign from 'generated/pages/pgListViewExtendShrink';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { faker } from '@faker-js/faker';
import { hideWaitDialog, showWaitDialog } from 'lib/LoadingIndicator';
import { getLviCompanyInfo, getLviCompanyInfoExtended } from 'components/LvExtend';

type Companies = {
  name: string;
  section: string;
  info: string;
};

export default class PgListViewExtendShrink extends withDismissAndBackButton(PgListViewExtendShrinkDesign) {
  private _serviceData: Companies[] = [];
  private _extendedIndexes: number[] = [];
  private _maxCount = 0;
  private _page = 1;
  private _paginating = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  async fakeRequest(page = 1): Promise<void> {
    console.info('fakeRequest: ', page);
    return new Promise((resolve) => {
      showWaitDialog();
      this._paginating = true;
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
        this._maxCount = 50;
        this._page = page;
        if (page === 1) {
          this._serviceData = companies;
        } else {
          this._serviceData = this._serviceData.concat(companies);
        }
        this.lvg.refreshData();
      })
      .finally(() => {
        hideWaitDialog();
        this._paginating = false;
      });
  }

  initListView() {
    this.lvg.processor = () => {
      this.lvg.items = this._serviceData.map((v, index) => {
        const isExtended = this._extendedIndexes.includes(index);
        return isExtended
          ? getLviCompanyInfoExtended({
              info: v.info,
              name: v.name,
              section: v.section,
              separatorVisible: this._serviceData.length - 1 !== index,
              onImageClick: () => {
                this._extendedIndexes = this._extendedIndexes.filter((v, _internalIndex) => v !== index);
                this.lvg.refreshData({ index });
              }
            })
          : getLviCompanyInfo({
              name: v.name,
              section: v.section,
              separatorVisible: this._serviceData.length - 1 !== index,
              onImageClick: () => {
                this._extendedIndexes.push(index);
                this.lvg.refreshData({ index });
              }
            });
      });
    };
    this.lvg.swipeEnabled = true;
    this.lvg.refreshEnabled = false;
    this.lvg.onRowBind = (item, index) => {
      Object.assign(item, this.lvg.items[index].properties);
      if (index === this.lvg.items.length - 1 && !this._paginating && this.lvg.items.length < this._maxCount) {
        this.fakeRequest(this._page + 1);
      }
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.fakeRequest();
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
