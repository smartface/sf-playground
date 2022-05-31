import LvExtendDesign from 'generated/my-components/LvExtend';
import { addChild, styleableComponentMixin } from '@smartface/styling-context';
import { RowAnimation } from '@smartface/native/ui/listview/listview';
import ListView from '@smartface/native/ui/listview';
import SwipeItem, { SwipeDirection } from '@smartface/native/ui/swipeitem';
import { themeService } from 'theme';
import ListViewItem from '@smartface/native/ui/listviewitem';

let currentIndex = -1;
let currenType = 0; //For UI editor, we should start from 1 instead of 0
const listViewTypeMapping: Map<number, typeof ListViewItem> = new Map();

let swipeItemCount = 0;

interface SwipeActions {
  swipeOnEdit?: SwipeItem['onPress'];
  swipeOnDelete?: SwipeItem['onPress'];
}

class StyleableSwipeItem extends styleableComponentMixin(SwipeItem) {}

// Add your other swipe items like this
const deleteItem = createSwipeAction('Delete', '.swipeItem.delete');
const editItem = createSwipeAction('Edit', '.swipeItem.edit');

/**
 * Properties which might be needed&implemented on various different listviewitems.
 */
interface GenericProperties {
  borders?: string[];
  swipeable?: boolean;
  className?: string;
  maxWidthMargin?: number;
  height?: number;
}

interface IProcessed<T> {
  type: number;
  height?: number;
  properties: Partial<T> & GenericProperties & SwipeActions;
}

export default class LvExtend extends LvExtendDesign {
  pageName?: string | undefined;
  items: IProcessed<ListViewItem>[] = [];

  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
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
      const LviClass = listViewTypeMapping.get(type);
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
    this.onRowBind = (listViewItem, index) => {
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

  /**
   * Will loop through listviewitems in order to get the type.
   * If it doesn't find any, it will add to the list and return the type anyways.
   */
  private getTypeOfListviewClass(classType: typeof ListViewItem) {
    const currentMap = Array.from(listViewTypeMapping).find(([key, value]) => {
      return value.name === classType.name;
    });
    // Couldn't find any, add to the class
    if (!currentMap) {
      listViewTypeMapping.set(++currenType, classType);
      return currenType;
    } else {
      return currentMap[0];
    }
  }

  getProcessedListViewItem<T extends ListViewItem>(
    klass: typeof ListViewItem & { getHeight: () => number },
    item?: Partial<T>,
    opts?: { height?: number; swipeActions?: SwipeActions }
  ): IProcessed<T> {
    const type = this.getTypeOfListviewClass(klass);
    return {
      type: type,
      properties: {
        ...item,
        ...opts?.swipeActions
      },
      height: opts?.height ?? klass.getHeight?.()
    };
  }
}

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
  });
  return swipeItem;
}
