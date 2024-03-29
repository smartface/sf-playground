import PgViewGroupDesign from 'generated/pages/pgViewGroup';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { styleableComponentMixin, styleableContainerComponentMixin } from '@smartface/styling-context';
import Label from '@smartface/native/ui/label';
import Color from '@smartface/native/ui/color';

class StyleableLabel extends styleableComponentMixin(Label) {}
class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

export default class PgViewGroup extends withDismissAndBackButton(PgViewGroupDesign) {
  myFl: StyleableFlexLayout;
  myChildLbl: StyleableLabel;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  // The page design has been made from the code for better
  // showcase purposes. As a best practice, remove this and
  // use WYSIWYG editor to style your pages.
  centerizeTheChildrenLayout() {
      this.style.apply({ flexProps: { flexDirection: 'ROW', justifyContent: 'CENTER', alignItems: 'CENTER' } });
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
    this.centerizeTheChildrenLayout();
    this.myFl = new StyleableFlexLayout();

    this.myFl.on('viewRemoved', (removedChild) => {
      console.log('viewRemoved');
      alert('removed child type: ');
    });
    this.myFl.on('viewAdded', (addedChild) => {
      console.log('viewAdded');
      alert('added child type: ');
    });

    this.myChildLbl = new StyleableLabel({
      text: 'Remove Me',
      width: 100,
      height: 50,
      textColor: Color.WHITE
    });

    this.btnAdd.on('press', () => {
      this.myFl.addChild(this.myChildLbl);
    });

    this.myChildLbl.on('touch', () => {
      this.myFl.removeChild(this.myChildLbl);
    });

    this.addChild(this.myFl, 'myFl', '.sf-flexLayout', {
      flexGrow: 1,
      height: 200,
      backgroundColor: '#00A1F1',
      flexProps: {
        alignSelf: 'CENTER'
      },
      textColor: '#FFFFFF'
    });
  }
}
