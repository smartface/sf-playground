import PgPageScrollViewDesign from 'generated/pages/pgPageScrollView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import TextAlignment from '@smartface/native/ui/shared/textalignment';
import ScrollView from '@smartface/native/ui/scrollview';

import View from "@smartface/native/ui/view";
import { styleableComponentMixin } from '@smartface/styling-context';
class StyleableView extends styleableComponentMixin(View) { }

let visible = false
export default class PgPageScrollView extends withDismissAndBackButton(PgPageScrollViewDesign) {
  myView: StyleableView;
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.button1.on('press', () => {
      this.label1.dispatch({
          type: 'updateUserStyle',
          userStyle: {
              height: 100
          }
      })

      this.scrollView2.dispatch({ 'type': 'updateUserStyle', userStyle: { height: 300 } })
      this.label1.textAlignment = TextAlignment.TOPLEFT

    //   this.myView = new StyleableView();
    //   setTimeout(() => {
    //     this.addChild(this.myView, "myView", ".sf-view", {
    //       width: 250,
    //       flexGrow: 1,
    //       height: 200,
    //       backgroundColor: "#03fcec",
    //       flexProps: {
    //         alignSelf: "CENTER",
    //       },
    //     });
    //   }, 1000);
    })

    this.visibleToggle.on('press', () => {
      if (this.myView.visible) {
        this.myView.visible = false
      } else {
        this.myView.visible = true
      }
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


    // setInterval(() => {
    //     console.log('setting sc height to bigger one');
        
    //     // this.scrollView2.dispatch({ 'type': 'updateUserStyle', userStyle: { height: 450 } })

    //     this.scrollView2.height = 450
    // }, 5000)
  }
}
