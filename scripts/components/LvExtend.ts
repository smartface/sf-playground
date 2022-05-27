import LvExtendDesign from 'generated/my-components/LvExtend';
import { addChild } from '@smartface/styling-context';
import LviCompanyInfo from './LviCompanyInfo';
import LviCompanyInfoExtended from './LviCompanyInfoExtended';
import { RowAnimation } from '@smartface/native/ui/listview/listview';
import ListView from '@smartface/native/ui/listview';
import SwipeItem, { SwipeDirection } from '@smartface/native/ui/swipeitem';
import { themeService } from 'theme';
import LviTitle from './LviTitle';

let currentIndex = -1;

const deleteItem = new ListView.SwipeItem() as StyleContextComponentType<SwipeItem>;
themeService.addGlobalComponent(deleteItem as any, `deleteItem`);
deleteItem.text = 'Delete';
deleteItem.dispatch({
  type: 'pushClassNames',
  classNames: '.swipeItem.delete'
});

const editItem = new ListView.SwipeItem() as StyleContextComponentType<SwipeItem>;
themeService.addGlobalComponent(editItem as any, `editItem`);
editItem.text = 'Edit';
editItem.dispatch({
  type: 'pushClassNames',
  classNames: '.swipeItem.edit'
});

export enum ListViewItemTypes {
  LVI_COMPANY_INFO_EXTENDED,
  LVI_COMPANY_INFO,
  LVI_TITLE
}

export const LviClasses = {
  [ListViewItemTypes.LVI_COMPANY_INFO_EXTENDED]: LviCompanyInfoExtended,
  [ListViewItemTypes.LVI_COMPANY_INFO]: LviCompanyInfo,
  [ListViewItemTypes.LVI_TITLE]: LviTitle
};

export type ListViewData = {
  type: ListViewItemTypes;
  height?: number;
  properties: PartialListViewItems;
};

export type PartialListViewItems = Partial<LviCompanyInfo> | Partial<LviCompanyInfoExtended> | Partial<LviTitle>;
export type ListViewItems = LviCompanyInfo | LviCompanyInfoExtended | LviTitle;

export default class LvExtend extends LvExtendDesign {
  pageName?: string | undefined;
  public items: IProcessed<ListViewData>[] = [];
  processor: () => void = () => {
    throw new Error('Not implemented');
  };
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
    this.initListView();
  }
  refreshData(opts: { index?: number } = { index: -1 }) {
    try {
      this.processor();
      this.checkIfSwipeShouldEnabled();
      this.itemCount = this.items.length;
      if (opts?.index > -1) {
        this.refreshRowRange({ positionStart: opts?.index || 0, itemCount: 1, ios: { animation: RowAnimation.AUTOMATIC } });
      } else {
        super.refreshData();
      }
    } catch (error) {
      console.error(error.message, { stack: error.stack });
    }
  }
  /**
   * Checks all items to see If any function assigned to swipe actions, If so enable swipe.
   */
  checkIfSwipeShouldEnabled() {
    this.swipeEnabled = (this.items || []).some((i) => i.properties?.swipeOnDelete || i.properties?.swipeOnEdit);
  }
  initListView() {
    this.onRowCreate = (type: ListViewItemTypes) => {
      const LviClass = LviClasses[type];
      const listViewItem = new LviClass();
      this.dispatch(addChild(`listViewItem${++currentIndex}`, listViewItem));
      return listViewItem;
    };
    this.onRowHeight = (index) => {
      return this.items[index].height || 0;
    };
    this.onRowType = (index) => {
      return this.items[index].type;
    };
    this.onRowBind = (listViewItem: ListViewItems, index) => {
      Object.assign(listViewItem, this.items[index].properties);
    };
    this.onRowSwipe = (opts) => {
      const items: SwipeItem[] = [];
      if (this.items[opts.index].properties.swipeOnEdit) {
        editItem.onPress = this.items[opts.index].properties.swipeOnEdit;
        items.push(editItem);
      } else if (this.items[opts.index].properties.swipeOnDelete) {
        deleteItem.onPress = this.items[opts.index].properties.swipeOnDelete;
        items.push(deleteItem);
      }
      return items;
    };
    /**
     * If item has any swipe function, automatically set onRowCanSwipe
     */
    this.onRowCanSwipe = (index) => {
      const directions: SwipeDirection[] = [];
      if (this.items[index].properties.swipeOnEdit) {
        directions.push(ListView.SwipeDirection.LEFTTORIGHT);
      } else if (this.items[index].properties.swipeOnDelete) {
        directions.push(ListView.SwipeDirection.RIGHTTOLEFT);
      }
      return directions;
    };
  }
}

type SwipeAction = (...args: any[]) => Promise<void> | void;

type SwipeActions = {
  swipeOnEdit?: SwipeAction;
  swipeOnDelete?: SwipeAction;
};

type GenericProperties = {
  borders?: string[];
  swipeable?: boolean;
  className?: string;
  maxWidthMargin?: number;
  height?: number;
};

interface IProcessed<T> {
  type: ListViewItemTypes;
  height?: number;
  properties: Partial<T> & GenericProperties & SwipeActions;
  [key: string]: any;
}

export namespace ProcessorTypes {
  export interface ILviCompanyInfo extends IProcessed<LviCompanyInfo> {}
  export interface ILviCompanyInfoExtended extends IProcessed<LviCompanyInfoExtended> {}
  export interface ILviTitle extends IProcessed<LviTitle> {}
}

export function getLviCompanyInfo(
  item: Partial<LviCompanyInfo>,
  opts?: { optionalHeight?: number; swipeActions?: SwipeActions }
): ProcessorTypes.ILviCompanyInfo {
  return {
    type: ListViewItemTypes.LVI_COMPANY_INFO,
    properties: {
      ...item,
      ...opts?.swipeActions
    },
    height: opts?.optionalHeight || LviCompanyInfo.getHeight()
  };
}

export function getLviCompanyInfoExtended(
  item: Partial<LviCompanyInfoExtended>,
  opts?: { optionalHeight?: number; swipeActions?: SwipeActions }
): ProcessorTypes.ILviCompanyInfoExtended {
  return {
    type: ListViewItemTypes.LVI_COMPANY_INFO_EXTENDED,
    properties: {
      ...item,
      ...opts?.swipeActions
    },
    height: opts?.optionalHeight || LviCompanyInfoExtended.getHeight()
  };
}

export function getLviTitle(item: Partial<LviTitle>, opts?: { optionalHeight?: number; swipeActions?: SwipeActions }): ProcessorTypes.ILviTitle {
  return {
    type: ListViewItemTypes.LVI_TITLE,
    properties: {
      ...item,
      ...opts?.swipeActions
    },
    height: opts?.optionalHeight || LviCompanyInfoExtended.getHeight()
  };
}
