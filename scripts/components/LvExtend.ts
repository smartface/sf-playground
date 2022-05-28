import LvExtendDesign from 'generated/my-components/LvExtend';
import { addChild, styleableComponentMixin } from '@smartface/styling-context';
import { RowAnimation } from '@smartface/native/ui/listview/listview';
import ListView from '@smartface/native/ui/listview';
import SwipeItem, { SwipeDirection } from '@smartface/native/ui/swipeitem';
import { themeService } from 'theme';
import ListViewItem from '@smartface/native/ui/listviewitem';

let currentIndex = -1;
let currenType = 1;
let swipeItemCount = 0;

interface SwipeActions {
  swipeOnEdit?: SwipeItem['onPress'];
  swipeOnDelete?: SwipeItem['onPress'];
};

/**
 * Properties which might be needed&implemented on various different listviewitems.
 */
interface GenericProperties {
  borders?: string[];
  swipeable?: boolean;
  className?: string;
  maxWidthMargin?: number;
  height?: number;
};

interface IProcessed<T> {
  type: number;
  height?: number;
  properties: Partial<T> & GenericProperties & SwipeActions;
}

class StyleableSwipeItem extends styleableComponentMixin(SwipeItem) { }


const listViewTypeMapping: Map<number, typeof ListViewItem> = new Map();

/**
 * TODO: Also add icon or other various parameters.
 */
function createSwipeAction(text: string, className?: string) {
  const swipeItem = new StyleableSwipeItem();
  themeService.addGlobalComponent(swipeItem as any, `listView-swipeItem${++swipeItemCount}`);
  swipeItem.text = text;
  swipeItem.dispatch({
    type: 'pushClassNames',
    classNames: [className]
  })
  return swipeItem;
}

const deleteItem = createSwipeAction('Delete', '.swipeItem.delete');
const editItem = createSwipeAction('Edit', '.swipeItem.edit');

export default class LvExtend extends LvExtendDesign {
  pageName?: string | undefined;
  public items: IProcessed<ListViewData>[] = [];

  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
    this.listViewTypeMapping = new Map();
    this.initListView();
  }
  processor: () => void = () => {
    throw new Error('Processor not implemented');
  };
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
    this.onRowCreate = (type: number) => {
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

/**
 * This function will add the given class to the mapping. It checks for duplicates
 */
function getListView(classType: any) {
  if(listViewTypeMapping.has(currenType)) {

  }
  else {
    // Check for duplicates
    listViewTypeMapping.forEach((klass, type) => {
      if(klass.constructor.name === classType.constructor.name) {
        
      }
    })
    listViewTypeMapping.set(currenType++, classType);
  }
}

getProcessedListViewItem<LviCompanyInfo>(LviCompanyInfo)


export function getProcessedListViewItem<T extends ListViewItem>(ListViewItemClass: new () => T, item?: Partial<T>, opts?: { optionalHeight: number; swipeActions?: SwipeActions }): IProcessed<T> {
  if (listViewTypeMapping.has(currenType)) {

    const currentListViewItem = listViewTypeMapping.get(currenType);

    if (currentListViewItem.constructor.name === pseudoListViewItem.constructor.name) {

    }
    else {

    }
  }
  return {
    type: ListViewItemTypes.LVI_COMPANY_INFO,
    properties: {
      ...item,
      ...opts?.swipeActions
    },
    height: opts?.optionalHeight || LviCompanyInfo.getHeight()
  }
}