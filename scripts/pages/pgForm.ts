import PgFormDesign from 'generated/pages/pgForm';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviMaterialTextBox from 'components/LviMaterialTextBox';
import LviDynamicLine from 'components/LviDynamicLine';
import { addChild } from '@smartface/styling-context';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import LviDoubleMaterialTextBox from 'components/LviDoubleMaterialTextBox';
import { maskPhoneNumber, unMaskPhoneNumber } from 'lib/Masking';

enum ListViewTypes {
  DoubleMTB,
  MTB,
  DynamicLine
}

type ListViewData = {
  type: ListViewTypes;
  properties: Partial<{
    hint?: string;
    text?: string;
    leftHint?: string;
    rightHint?: string;
  }>;
  key?: string;
  leftKey?: string;
  rightKey?: string;
};

const listViewConfig = [
  {
    type: ListViewTypes.DoubleMTB,
    leftKey: 'first_name',
    rightKey: 'last_name',
    properties: {
      leftHint: 'First name',
      rightHint: 'Last name'
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
    type: ListViewTypes.DynamicLine,
    properties: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
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
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '7-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '8-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
    }
  },
  {
    type: ListViewTypes.DynamicLine,
    properties: {
      text: '9-Example Lines Added for Recycling so on scroll all mtbs recycle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros libero, bibendum vel mollis tristique, posuere vitae erat. Maecenas quis dui dolor. Mauris egestas leo sed erat imperdiet iaculis. Morbi pulvinar ullamcorper diam ut commodo. Pellentesque in vestibulum velit. Pellentesque pretium purus purus, sit amet gravida nibh molestie id. Aliquam vel placerat est.'
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
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  refreshListView() {
    this.lv.itemCount = this._listViewData.length;
    this.lv.refreshData();
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
      } else if (type === ListViewTypes.MTB) {
        listViewItem = new LviMaterialTextBox();
      } else {
        listViewItem = new LviDoubleMaterialTextBox();
      }
      this.lv.dispatch(addChild(`listViewItem${++this._itemIndex}`, listViewItem));
      return listViewItem;
    };
    this.lv.onRowHeight = (index) => {
      const type = this._listViewData[index].type;
      if (type === ListViewTypes.DynamicLine) {
        return LviDynamicLine.getHeight(this._listViewData[index].properties.text);
      } else if (type === ListViewTypes.MTB) {
        return LviMaterialTextBox.getHeight();
      } else {
        return LviDoubleMaterialTextBox.getHeight();
      }
    };
    this.lv.onRowType = (index) => {
      return this._listViewData[index].type;
    };
    this.lv.onRowBind = (listViewItem: LviDynamicLine | LviMaterialTextBox | LviDoubleMaterialTextBox, index) => {
      if (listViewItem instanceof LviDynamicLine) {
        listViewItem.text = this._listViewData[index].properties.text;
      } else if (listViewItem instanceof LviMaterialTextBox) {
        listViewItem.materialTextBox.hint = this._listViewData[index].properties.hint;
        listViewItem.materialTextBox.text = this[this._listViewData[index].key];
        listViewItem.materialTextBox.errorMessage = '';
        listViewItem.materialTextBox.onActionButtonPress = () => {
          listViewItem?.materialTextBox?.removeFocus?.();
        };
        listViewItem.materialTextBox.onEditBegins = () => {
          console.log('onEditBegins: ', this._listViewData[index].properties.hint);
        };
        listViewItem.materialTextBox.onEditEnds = () => {
          console.log('onEditEnds: ', this._listViewData[index].properties.hint);
        };
        listViewItem.materialTextBox.onTextChanged = () => {
          console.log('textChanged: ', listViewItem.materialTextBox.text);
          this[this._listViewData[index].key] = listViewItem.materialTextBox.text;
        };
        switch (this._listViewData[index].key) {
          case 'email': {
            listViewItem.materialTextBox.errorMessage =
              !listViewItem.materialTextBox.text.includes('@') || !listViewItem.materialTextBox.text.includes('.') ? 'Not a valid email' : '';
            listViewItem.materialTextBox.keyboardType = KeyboardType.EMAILADDRESS;
            listViewItem.materialTextBox.onEditEnds = () => {
              const text = listViewItem.materialTextBox.text;
              listViewItem.materialTextBox.errorMessage = !text.includes('@') || !text.includes('.') ? 'Not a valid email' : '';
            };
            break;
          }
          case 'phone_number': {
            listViewItem.materialTextBox.text = maskPhoneNumber(this[this._listViewData[index].key]);
            listViewItem.materialTextBox.keyboardType = KeyboardType.NUMBER;
            listViewItem.materialTextBox.onTextChanged = () => {
              console.log('textChanged: ', listViewItem.materialTextBox.text);
              this[this._listViewData[index].key] = unMaskPhoneNumber(listViewItem.materialTextBox.text);
              listViewItem.materialTextBox.text = maskPhoneNumber(this[this._listViewData[index].key]);
            };
            break;
          }
          default: {
            listViewItem.materialTextBox.keyboardType = KeyboardType.DEFAULT;
          }
        }
      } else {
        listViewItem.leftMaterialTextBox.hint = this._listViewData[index].properties.leftHint;
        listViewItem.rightMaterialTextBox.hint = this._listViewData[index].properties.rightHint;
        listViewItem.leftMaterialTextBox.text = this[this._listViewData[index].leftKey];
        listViewItem.rightMaterialTextBox.text = this[this._listViewData[index].rightKey];
        listViewItem.leftMaterialTextBox.onTextChanged = () => {
          console.log('leftMaterialTextBox textChanged: ', listViewItem.leftMaterialTextBox.text);
          this[this._listViewData[index].leftKey] = listViewItem.leftMaterialTextBox.text;
        };
        listViewItem.rightMaterialTextBox.onTextChanged = () => {
          console.log('rightMaterialTextBox textChanged: ', listViewItem.rightMaterialTextBox.text);
          this[this._listViewData[index].rightKey] = listViewItem.rightMaterialTextBox.text;
        };
        listViewItem.leftMaterialTextBox.onActionButtonPress = () => {
          listViewItem?.rightMaterialTextBox?.requestFocus?.();
        };
        listViewItem.rightMaterialTextBox.onActionButtonPress = () => {
          listViewItem?.rightMaterialTextBox?.removeFocus?.();
        };
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
