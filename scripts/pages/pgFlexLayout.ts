import PgFlexLayoutDesign from 'generated/pages/pgFlexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Picker from '@smartface/native/ui/picker';
import Flex from '@smartface/native/ui/shared/Flex';
import FlexLayout from '@smartface/native/ui/flexlayout';

const JustifyContent = [
  {
    native: Flex.JustifyContent.CENTER,
    context: 'CENTER'
  },
  {
    native: Flex.JustifyContent.FLEX_START,
    context: 'FLEX_START'
  },
  {
    native: Flex.JustifyContent.FLEX_END,
    context: 'FLEX_END'
  },
  {
    native: Flex.JustifyContent.SPACE_AROUND,
    context: 'SPACE_AROUND'
  },
  {
    native: Flex.JustifyContent.SPACE_BETWEEN,
    context: 'SPACE_BETWEEN'
  },
  {
    native: Flex.JustifyContent.SPACE_EVENLY,
    context: 'SPACE_EVENLY'
  },
]

const FlexDirection = [
  {
    native: Flex.FlexDirection.COLUMN,
    context: 'COLUMN'
  },
  {
    native: Flex.FlexDirection.COLUMN_REVERSE,
    context: 'COLUMN_REVERSE'
  },
  {
    native: Flex.FlexDirection.ROW,
    context: 'ROW'
  },
  {
    native: Flex.FlexDirection.ROW_REVERSE,
    context: 'ROW_REVERSE'
  },
];

const AlignItems = [
  {
    native: Flex.AlignItems.AUTO,
    context: 'AUTO'
  },
  {
    native: Flex.AlignItems.CENTER,
    context: 'CENTER'
  },
  {
    native: Flex.AlignItems.FLEX_END,
    context: 'FLEX_END'
  },
  {
    native: Flex.AlignItems.FLEX_START,
    context: 'FLEX_START'
  },
  {
    native: Flex.AlignItems.STRETCH,
    context: 'STRETCH'
  },
]

const AlignContent = [
  {
    native: Flex.AlignContent.AUTO,
    context: 'AUTO'
  },
  {
    native: Flex.AlignContent.CENTER,
    context: 'CENTER'
  },
  {
    native: Flex.AlignContent.FLEX_END,
    context: 'FLEX_END'
  },
  {
    native: Flex.AlignContent.FLEX_START,
    context: 'FLEX_START'
  },
  {
    native: Flex.AlignContent.STRETCH,
    context: 'STRETCH'
  },
]

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
    picker.items = JustifyContent.map((justifyContent) => justifyContent.context);
    picker.on('selected', (index) => {
      this.fl.justifyContent = JustifyContent[index].native
      console.info('justifyContent: ', index);
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            justifyContent: JustifyContent[index].context
          }
        }
      });
    });
    picker.show();
  }

  changeWrap() {
    const isWrap = this.fl.flexWrap === Flex.FlexWrap.WRAP;
    this.fl.flexWrap = isWrap ? Flex.FlexWrap.NOWRAP : Flex.FlexWrap.WRAP;
    console.info('flexWrap: ', this.fl.flexWrap);
    this.fl.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          flexWrap: isWrap ? 'NOWRAP' : 'WRAP'
        }
      }
    });
    this.btnFlexWrap.text = isWrap ? 'Change to Flex NoWrap' : 'Change to Flex Wrap';
  }

  changeFlexDirection() {
    const picker = new Picker();
    const items = FlexDirection.map((direction) => direction.context)
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('flexDirection: ', index);
      this.fl.flexDirection = FlexDirection[index].native
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            flexDirection: FlexDirection[index].context
          }
        }
      });
    });
    picker.show();
  }

  changeDirection() {
    const isLTR = this.fl.direction === Flex.Direction.LTR;
    this.fl.direction = isLTR ? Flex.Direction.RTL : Flex.Direction.LTR;
    this.fl.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        flexProps: {
          direction: isLTR ? 'RTL' : 'LTR'
        }
      }
    });
    this.btnDirection.text = isLTR ? 'Change to RTL' : 'Change to LTR';
  }

  showPickerForAlignItems() {
    const picker = new Picker();
    const items = AlignItems.map((items) => items.context);
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('alignItems: ', index);
      this.fl.alignItems = AlignItems[index].native
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            alignItems: AlignItems[index].context
          }
        }
      });
    });
    picker.show();
  }

  showPickerForAlignContent() {
    const picker = new Picker();
    const items = AlignContent.map((alignContent) => alignContent.context)
    picker.items = items;
    picker.on('selected', (index) => {
      console.info('alignContent: ', index);
      this.fl.alignContent = AlignContent[index].native
      this.fl.dispatch({
        type: 'updateUserStyle',
        userStyle: {
          flexProps: {
            alignContent: AlignContent[index].context
          }
        }
      });
    });
    picker.show();
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
