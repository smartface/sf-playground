import PgLabelRelatedApplyLayoutDesign from 'generated/pages/pgLabelRelatedApplyLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

import { styleableContainerComponentMixin, styleableComponentMixin } from '@smartface/styling-context';
import Label from "@smartface/native/ui/label";
import Font from '@smartface/native/ui/font';
class StyleableLabel extends styleableComponentMixin(Label) { }

export default class PgLabelRelatedApplyLayout extends withDismissAndBackButton(PgLabelRelatedApplyLayoutDesign) {
  myLabel: StyleableLabel;

  constructor(private router?: Router, private route?: Route) {
    super({});

    this.addLabelChild.on('press', () => {
      // this.labelWrapper.dispatch({'type': 'updateUserStyle', userStyle: {paddingLeft: 50}})

      this.myLabel = new StyleableLabel({
        text: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      });
      this.myLabel.maxLines = 0


      this.labelWrapper.addChild(this.myLabel, "myLabel", "", {
        // padding: 50,
        // borderWidth: 5,
        // width: 320,
        // height: 20,
        // textAlignment: "MIDLEFT",
        // left: 35,
        // font: {
        //   size: 16,
        //   bold: true,
        //   italic: false,
        //   family: "Arial",
        // },
        textColor: "#000000",
      });

      this.layout.applyLayout()

      setTimeout(() => {
        this.myLabel.borderWidth = 5
        // this.myLabel.font = Font.create('Times New Roman', 30, Font.NORMAL);
      }, 2500);
    })
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
