import PgFlexLayoutDesign from 'generated/pages/FlexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Picker from '@smartface/native/ui/picker';
import FlexLayout from '@smartface/native/ui/flexlayout';
import System from '@smartface/native/device/system';

export default class PgFlexLayout extends withDismissAndBackButton(PgFlexLayoutDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnAlignContent.on('press', () => this.showPickerForAlignContent());
    this.btnAlignItems.on('press', () => this.showPickerForAlignItems());
    this.btnDirection.on('press', () => this.changeDirection());
    this.btnFlexDirection.on('press', () => this.changeFlexDirection());
    this.btnFlexWrap.on('press', () => this.changeWrap());
    this.btnJustifyContent.on('press', () => this.showPickerForJustifyContent());
  }

  showPickerForJustifyContent() {
    const picker = new Picker();
    const items = ['CENTER', 'FLEX_START', 'FLEX_END', 'SPACE_AROUND', 'SPACE_BETWEEN'];
    picker.items = items;
    picker.on('selected', (index) => {
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            justifyContent: items[index]
          }
        }
      });
      this.applyFlLayout();
    });
    picker.show();
  }

  changeWrap() {
    const isWrap = this.fl.flexWrap === FlexLayout.FlexWrap.WRAP;
    this.fl.flexWrap = isWrap ? FlexLayout.FlexWrap.NOWRAP : FlexLayout.FlexWrap.WRAP;
    this.fl.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          flexWrap: isWrap ? 'NOWRAP' : 'WRAP'
        }
      }
    });
    this.btnFlexWrap.text = isWrap ? 'Change to Flex NoWrap' : 'Change to Flex Wrap';
    this.applyFlLayout();
  }

  changeFlexDirection() {
    const picker = new Picker();
    const items = ['COLUMN', 'COLUMN_REVERSE', 'ROW', 'ROW_REVERSE'];
    picker.items = items;
    picker.on('selected', (index) => {
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            flexDirection: items[index]
          }
        }
      });
      this.applyFlLayout();
    });
    picker.show();
  }

  changeDirection() {
    const isLTR = this.fl.direction === FlexLayout.Direction.LTR;
    this.fl.direction = isLTR ? FlexLayout.Direction.RTL : FlexLayout.Direction.LTR;
    this.fl.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          direction: isLTR ? 'RTL' : 'LTR'
        }
      }
    });
    this.applyFlLayout();
    this.btnDirection.text = isLTR ? 'Change to RTL' : 'Change to LTR';
  }

  showPickerForAlignItems() {
    const picker = new Picker();
    const items = ['AUTO', 'CENTER', 'FLEX_START', 'FLEX_END', 'STRETCH'];
    picker.items = items;
    picker.on('selected', (index) => {
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            alignItems: items[index]
          }
        }
      });
      this.applyFlLayout();
    });
    picker.show();
  }

  showPickerForAlignContent() {
    const picker = new Picker();
    const items = ['AUTO', 'CENTER', 'FLEX_START', 'FLEX_END', 'STRETCH'];
    picker.items = items;
    picker.on('selected', (index) => {
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            alignContent: items[index]
          }
        }
      });
      this.applyFlLayout();
    });
    picker.show();
  }

  applyFlLayout() {
    System.OS === System.OSType.IOS ? this.layout.applyLayout() : this.fl.applyLayout();
  }
  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
