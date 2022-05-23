import PgFormDesign from 'generated/pages/pgForm';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviMaterialTextBox from 'components/LviMaterialTextBox';
import LviDynamicLine from 'components/LviDynamicLine';
import LviElement from 'components/LviElement';
import { addChild } from '@smartface/styling-context';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';

enum ListViewTypes {
  MTB,
  DynamicLine,
  Element
}

type ListViewData = {
  type: ListViewTypes;
  properties: Partial<{ hint?: string; key?: string; value?: string; text?: string }>;
  key?: string;
};

const listViewConfig = [
  {
    type: ListViewTypes.MTB,
    key: 'first_name',
    properties: {
      hint: 'First name'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '1-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '2-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '3-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'last_name',
    properties: {
      hint: 'Last name'
    }
  },
  {
    type: ListViewTypes.Element,
    properties: {
      key: 'Example Key1',
      value: 'Example Value1'
    }
  },
  {
    type: ListViewTypes.Element,
    properties: {
      key: 'Example Key2',
      value: 'Example Value2'
    }
  },
  {
    type: ListViewTypes.Element,
    properties: {
      key: 'Example Key3',
      value: 'Example Value3'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'phone_number',
    properties: {
      hint: 'Phone Number'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '4-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '5-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '6-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'address',
    properties: {
      hint: 'Address'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'country',
    properties: {
      hint: 'Country'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'email',
    properties: {
      hint: 'Email'
    }
  },
  {
    type: ListViewTypes.MTB,
    key: 'company',
    properties: {
      hint: 'Company'
    }
  }
];

export default class PgForm extends withDismissAndBackButton(PgFormDesign) {
  private _itemIndex = -1;
  private phone_number = '';
  private last_name = '';
  private first_name = '';
  private country = '';
  private email = '';
  private company = '';
  private address = 'Example address';
  private _listViewData: ListViewData[] = listViewConfig;
  private disposables = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  refreshListView() {
    this.lv.itemCount = this._listViewData.length;
    this.lv.refreshData();
  }

  findNextMaterialInput(index) {
    this._listViewData.findIndex(() => {});
  }

  initListView() {
    this.lv.refreshEnabled = false;
    /**
     * All these if-else cases added for better understanding
     * For best practices we suggest the implementation made on page PgListViewExtendShrink.
     */
    this.lv.onRowCreate = (type: ListViewTypes) => {
      let listViewItem;
      if (type === ListViewTypes.DynamicLine) {
        listViewItem = new LviDynamicLine();
      } else if (type === ListViewTypes.Element) {
        listViewItem = new LviElement();
      } else {
        listViewItem = new LviMaterialTextBox();
      }
      this.lv.dispatch(addChild(`listViewItem${++this._itemIndex}`, listViewItem));
      return listViewItem;
    };
    this.lv.onRowHeight = (index) => {
      const type = this._listViewData[index].type;
      if (type === ListViewTypes.DynamicLine) {
        return LviDynamicLine.getHeight(this._listViewData[index].properties.text);
      } else if (type === ListViewTypes.Element) {
        return LviElement.getHeight();
      } else {
        return LviMaterialTextBox.getHeight();
      }
    };
    this.lv.onRowType = (index) => {
      return this._listViewData[index].type;
    };
    this.lv.onRowBind = (listViewItem: LviDynamicLine | LviElement | LviMaterialTextBox, index) => {
      if (listViewItem instanceof LviDynamicLine) {
        listViewItem.text = this._listViewData[index].properties.text;
      } else if (listViewItem instanceof LviElement) {
        listViewItem.keyText = this._listViewData[index].properties.key;
        listViewItem.valueText = this._listViewData[index].properties.value;
      } else {
        listViewItem.materialTextBox.hint = this._listViewData[index].properties.hint;
        listViewItem.materialTextBox.text = this[this._listViewData[index].key];
        listViewItem.materialTextBox.on('textChanged', () => {
          console.log('textChanged: ', listViewItem.materialTextBox.text);
          this[this._listViewData[index].key] = listViewItem.materialTextBox.text;
        });
        switch (this._listViewData[index].key) {
          case 'email': {
            listViewItem.materialTextBox.keyboardType = KeyboardType.EMAILADDRESS;
          }
        }
      }
    };
  }

  onShow() {
    super.onShow();
    this.refreshListView();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.initListView();
  }
}
